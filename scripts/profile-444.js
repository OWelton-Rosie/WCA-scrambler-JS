import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as inspector from "node:inspector";
import {
  generateScramble as generateRandomStateScramble,
  prepareEvent
} from "@cubesmith/scrambler";

const requestedSamples = Number(process.argv[2] ?? 100);
const outputPath = resolve(process.argv[3] ?? "444-cpu-profile.cpuprofile");
const warmupSamples = 5;

if (!Number.isSafeInteger(requestedSamples) || requestedSamples < 1) {
  console.error(
    "Usage: npm run profile:444 -- [positive-sample-count] [output-file]"
  );
  process.exitCode = 1;
} else {
  function post(session, method, params = {}) {
    return new Promise((resolvePost, rejectPost) => {
      session.post(method, params, (error, result) => {
        if (error) rejectPost(error);
        else resolvePost(result);
      });
    });
  }

  console.log("Preparing 4×4 solver tables (excluded from profile)...");
  await prepareEvent("444");

  console.log("Warming up backend (" + warmupSamples + " samples, excluded)...");
  for (let index = 0; index < warmupSamples; index++) {
    await generateRandomStateScramble("444", {
      seed: "profile-444-warmup-" + index
    });
  }

  const session = new inspector.Session();
  session.connect();

  let profile;
  let generationError;

  try {
    await post(session, "Profiler.enable");
    await post(session, "Profiler.start");

    console.log("Profiling " + requestedSamples + " warm backend generations...");

    for (let index = 0; index < requestedSamples; index++) {
      await generateRandomStateScramble("444", {
        seed: "profile-444-sample-" + index
      });
    }
  } catch (error) {
    generationError = error;
  } finally {
    try {
      const result = await post(session, "Profiler.stop");
      profile = result.profile;
      await post(session, "Profiler.disable");
    } finally {
      session.disconnect();
    }
  }

  if (generationError) throw generationError;
  if (!profile) throw new Error("The CPU profiler did not return a profile");

  writeFileSync(outputPath, JSON.stringify(profile));
  console.log("CPU profile written to: " + outputPath);
  console.log(
    "Open the .cpuprofile file in Chrome DevTools to inspect hot functions."
  );
}
