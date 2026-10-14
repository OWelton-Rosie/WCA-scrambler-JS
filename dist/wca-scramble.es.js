var bf = Object.defineProperty;
var xf = (e, n, t) => n in e ? bf(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var Yn = (e, n, t) => xf(e, typeof n != "symbol" ? n + "" : n, t);
function Of(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xt = { exports: {} }, Tf = Xt.exports, Zi;
function Tc() {
  return Zi || (Zi = 1, (function(e) {
    (function() {
      var n, t, r, o, i, s, c, a, u, f, l, d, p, v, M, C, L, R, G, $, K, ee, Q, re, j, V, Y, ce, ae, he, J, le, ue;
      [G, R, v, i, L, n] = [0, 1, 2, 3, 4, 5], [Y, Q, j, K, u, l, c, p] = [0, 1, 2, 3, 4, 5, 6, 7], [V, ee, re, $, d, a, f, s, C, M, t, r] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [ae, J, ue] = (function() {
        var se, oe, de, q, me, T;
        return T = function(x) {
          return x - 1;
        }, me = function(x) {
          return T(9) + x;
        }, de = function(x) {
          return me(9) + x;
        }, oe = function(x) {
          return de(9) + x;
        }, q = function(x) {
          return oe(9) + x;
        }, se = function(x) {
          return q(9) + x;
        }, [
          // Centers
          [
            4,
            13,
            22,
            31,
            40,
            49
          ],
          // Corners
          [
            [
              T(9),
              me(1),
              de(3)
            ],
            [
              T(7),
              de(1),
              q(3)
            ],
            [
              T(1),
              q(1),
              se(3)
            ],
            [
              T(3),
              se(1),
              me(3)
            ],
            [
              oe(3),
              de(9),
              me(7)
            ],
            [
              oe(1),
              q(9),
              de(7)
            ],
            [
              oe(7),
              se(9),
              q(7)
            ],
            [
              oe(9),
              me(9),
              se(7)
            ]
          ],
          // Edges
          [
            [
              T(6),
              me(2)
            ],
            [
              T(8),
              de(2)
            ],
            [
              T(4),
              q(2)
            ],
            [
              T(2),
              se(2)
            ],
            [
              oe(6),
              me(8)
            ],
            [
              oe(2),
              de(8)
            ],
            [
              oe(4),
              q(8)
            ],
            [
              oe(8),
              se(8)
            ],
            [
              de(6),
              me(4)
            ],
            [
              de(4),
              q(6)
            ],
            [
              se(6),
              q(4)
            ],
            [
              se(4),
              me(6)
            ]
          ]
        ];
      })(), ce = ["U", "R", "F", "D", "L", "B"], he = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], le = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], o = (function() {
        var se, oe, de;
        class q {
          constructor(T) {
            T != null ? this.init(T) : this.identity(), this.newCenter = (function() {
              var x, b;
              for (b = [], x = 0; x <= 5; ++x)
                b.push(0);
              return b;
            })(), this.newCp = (function() {
              var x, b;
              for (b = [], x = 0; x <= 7; ++x)
                b.push(0);
              return b;
            })(), this.newEp = (function() {
              var x, b;
              for (b = [], x = 0; x <= 11; ++x)
                b.push(0);
              return b;
            })(), this.newCo = (function() {
              var x, b;
              for (b = [], x = 0; x <= 7; ++x)
                b.push(0);
              return b;
            })(), this.newEo = (function() {
              var x, b;
              for (b = [], x = 0; x <= 11; ++x)
                b.push(0);
              return b;
            })();
          }
          init(T) {
            return this.center = T.center.slice(0), this.co = T.co.slice(0), this.ep = T.ep.slice(0), this.cp = T.cp.slice(0), this.eo = T.eo.slice(0);
          }
          identity() {
            return this.center = [0, 1, 2, 3, 4, 5], this.cp = [0, 1, 2, 3, 4, 5, 6, 7], this.co = (function() {
              var T, x;
              for (x = [], T = 0; T <= 7; ++T)
                x.push(0);
              return x;
            })(), this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.eo = (function() {
              var T, x;
              for (x = [], T = 0; T <= 11; ++T)
                x.push(0);
              return x;
            })();
          }
          toJSON() {
            return {
              center: this.center,
              cp: this.cp,
              co: this.co,
              ep: this.ep,
              eo: this.eo
            };
          }
          asString() {
            var T, x, b, P, F, U, H, te, N, X, z;
            for (z = [], b = P = 0; P <= 5; b = ++P)
              z[9 * b + 4] = ce[this.center[b]];
            for (b = F = 0; F <= 7; b = ++F)
              for (T = this.cp[b], N = this.co[b], H = U = 0; U <= 2; H = ++U)
                z[J[b][(H + N) % 3]] = he[T][H];
            for (b = te = 0; te <= 11; b = ++te)
              for (x = this.ep[b], N = this.eo[b], H = X = 0; X <= 1; H = ++X)
                z[ue[b][(H + N) % 2]] = le[x][H];
            return z.join("");
          }
          static fromString(T) {
            var x, b, P, F, U, H, te, N, X, z, pe, be, xe, h;
            for (P = new q(), F = H = 0; H <= 5; F = ++H)
              for (U = te = 0; te <= 5; U = ++te)
                T[9 * F + 4] === ce[U] && (P.center[F] = U);
            for (F = N = 0; N <= 7; F = ++N) {
              for (z = X = 0; X <= 2 && !((h = T[J[F][z]]) === "U" || h === "D"); z = ++X)
                ;
              for (x = T[J[F][(z + 1) % 3]], b = T[J[F][(z + 2) % 3]], U = pe = 0; pe <= 7; U = ++pe)
                x === he[U][1] && b === he[U][2] && (P.cp[F] = U, P.co[F] = z % 3);
            }
            for (F = be = 0; be <= 11; F = ++be)
              for (U = xe = 0; xe <= 11; U = ++xe) {
                if (T[ue[F][0]] === le[U][0] && T[ue[F][1]] === le[U][1]) {
                  P.ep[F] = U, P.eo[F] = 0;
                  break;
                }
                if (T[ue[F][0]] === le[U][1] && T[ue[F][1]] === le[U][0]) {
                  P.ep[F] = U, P.eo[F] = 1;
                  break;
                }
              }
            return P;
          }
          clone() {
            return new q(this.toJSON());
          }
          // A class method returning a new random cube
          static random() {
            return new q().randomize();
          }
          isSolved() {
            var T, x, b, P, F, U, H;
            for (b = this.clone(), b.move(b.upright()), x = F = 0; F <= 5; x = ++F)
              if (b.center[x] !== x)
                return !1;
            for (T = U = 0; U <= 7; T = ++U)
              if (b.cp[T] !== T || b.co[T] !== 0)
                return !1;
            for (P = H = 0; H <= 11; P = ++H)
              if (b.ep[P] !== P || b.eo[P] !== 0)
                return !1;
            return !0;
          }
          // Multiply this Cube with another Cube, restricted to centers.
          centerMultiply(T) {
            var x, b, P;
            for (P = b = 0; b <= 5; P = ++b)
              x = T.center[P], this.newCenter[P] = this.center[x];
            return [this.center, this.newCenter] = [this.newCenter, this.center], this;
          }
          // Multiply this Cube with another Cube, restricted to corners.
          cornerMultiply(T) {
            var x, b, P;
            for (P = b = 0; b <= 7; P = ++b)
              x = T.cp[P], this.newCp[P] = this.cp[x], this.newCo[P] = (this.co[x] + T.co[P]) % 3;
            return [this.cp, this.newCp] = [this.newCp, this.cp], [this.co, this.newCo] = [this.newCo, this.co], this;
          }
          // Multiply this Cube with another Cube, restricted to edges
          edgeMultiply(T) {
            var x, b, P;
            for (P = b = 0; b <= 11; P = ++b)
              x = T.ep[P], this.newEp[P] = this.ep[x], this.newEo[P] = (this.eo[x] + T.eo[P]) % 2;
            return [this.ep, this.newEp] = [this.newEp, this.ep], [this.eo, this.newEo] = [this.newEo, this.eo], this;
          }
          // Multiply this cube with another Cube
          multiply(T) {
            return this.centerMultiply(T), this.cornerMultiply(T), this.edgeMultiply(T), this;
          }
          move(T) {
            var x, b, P, F, U, H, te, N;
            for (te = de(T), b = 0, F = te.length; b < F; b++)
              for (U = te[b], x = U / 3 | 0, H = U % 3, P = 0, N = H; 0 <= N ? P <= N : P >= N; 0 <= N ? ++P : --P)
                this.multiply(q.moves[x]);
            return this;
          }
          upright() {
            var T, x, b, P, F, U;
            for (T = this.clone(), U = [], x = P = 0; P <= 5 && T.center[x] !== v; x = ++P)
              ;
            switch (x) {
              case i:
                U.push("x");
                break;
              case G:
                U.push("x'");
                break;
              case n:
                U.push("x2");
                break;
              case R:
                U.push("y");
                break;
              case L:
                U.push("y'");
            }
            for (U.length && T.move(U[0]), b = F = 0; F <= 5 && T.center[b] !== G; b = ++F)
              ;
            switch (b) {
              case L:
                U.push("z");
                break;
              case R:
                U.push("z'");
                break;
              case i:
                U.push("z2");
            }
            return U.join(" ");
          }
          static inverse(T) {
            var x, b, P, F, U, H, te;
            if (H = (function() {
              var N, X, z, pe;
              for (z = de(T), pe = [], N = 0, X = z.length; N < X; N++)
                F = z[N], x = F / 3 | 0, U = F % 3, pe.push(x * 3 + -(U - 1) + 1);
              return pe;
            })(), H.reverse(), typeof T == "string") {
              for (te = "", b = 0, P = H.length; b < P; b++)
                F = H[b], x = F / 3 | 0, U = F % 3, te += se[x], U === 1 ? te += "2" : U === 2 && (te += "'"), te += " ";
              return te.substring(0, te.length - 1);
            } else return T.length != null ? H : H[0];
          }
        }
        return q.prototype.randomize = (function() {
          var me, T, x, b, P, F, U, H, te;
          return F = function(N, X) {
            return N + Math.floor(Math.random() * (X - N + 1));
          }, te = function(N) {
            var X, z;
            for (X = N.length; X !== 0; )
              z = F(0, X - 1), X -= 1, N[X], [N[X], N[z]] = [N[z], N[X]];
          }, b = function(N) {
            var X, z, pe, be, xe, h, g;
            for (xe = 0, g = (function() {
              var w, S, m;
              for (m = [], w = 0, S = N.length - 1; 0 <= S ? w <= S : w >= S; 0 <= S ? ++w : --w)
                m.push(!1);
              return m;
            })(); ; ) {
              for (X = -1, pe = be = 0, h = N.length - 1; 0 <= h ? be <= h : be >= h; pe = 0 <= h ? ++be : --be)
                if (!g[pe]) {
                  X = pe;
                  break;
                }
              if (X === -1)
                break;
              for (z = 0; !g[X]; )
                g[X] = !0, z++, X = N[X];
              xe += z + 1;
            }
            return xe;
          }, me = function(N, X) {
            var z;
            return z = b(X) + b(N), z % 2 === 0;
          }, x = function(N, X) {
            for (te(X), te(N); !me(N, X); )
              te(X), te(N);
          }, U = function(N, X) {
            var z, pe, be, xe;
            for (be = 0, z = pe = 0, xe = N.length - 1; 0 <= xe ? pe <= xe : pe >= xe; z = 0 <= xe ? ++pe : --pe)
              be += N[z] = F(0, X - 1);
          }, P = function(N, X) {
            return N.reduce(function(z, pe) {
              return z + pe;
            }) % X === 0;
          }, T = function(N, X) {
            for (U(N, 3); !P(N, 3); )
              U(N, 3);
            for (U(X, 2); !P(X, 2); )
              U(X, 2);
          }, H = function() {
            return x(this.cp, this.ep), T(this.co, this.eo), this;
          }, H;
        })(), q.moves = [
          {
            // U
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              K,
              Y,
              Q,
              j,
              u,
              l,
              c,
              p
            ],
            co: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            ep: [
              $,
              V,
              ee,
              re,
              d,
              a,
              f,
              s,
              C,
              M,
              t,
              r
            ],
            eo: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            // R
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              u,
              Q,
              j,
              Y,
              p,
              l,
              c,
              K
            ],
            co: [
              2,
              0,
              0,
              1,
              1,
              0,
              0,
              2
            ],
            ep: [
              C,
              ee,
              re,
              $,
              r,
              a,
              f,
              s,
              d,
              M,
              t,
              V
            ],
            eo: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            // F
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              Q,
              l,
              j,
              K,
              Y,
              u,
              c,
              p
            ],
            co: [
              1,
              2,
              0,
              0,
              2,
              1,
              0,
              0
            ],
            ep: [
              V,
              M,
              re,
              $,
              d,
              C,
              f,
              s,
              ee,
              a,
              t,
              r
            ],
            eo: [
              0,
              1,
              0,
              0,
              0,
              1,
              0,
              0,
              1,
              1,
              0,
              0
            ]
          },
          {
            // D
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              Y,
              Q,
              j,
              K,
              l,
              c,
              p,
              u
            ],
            co: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            ep: [
              V,
              ee,
              re,
              $,
              a,
              f,
              s,
              d,
              C,
              M,
              t,
              r
            ],
            eo: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            // L
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              Y,
              j,
              c,
              K,
              u,
              Q,
              l,
              p
            ],
            co: [
              0,
              1,
              2,
              0,
              0,
              2,
              1,
              0
            ],
            ep: [
              V,
              ee,
              t,
              $,
              d,
              a,
              M,
              s,
              C,
              re,
              f,
              r
            ],
            eo: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            // B
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              Y,
              Q,
              K,
              p,
              u,
              l,
              j,
              c
            ],
            co: [
              0,
              0,
              1,
              2,
              0,
              0,
              2,
              1
            ],
            ep: [
              V,
              ee,
              re,
              r,
              d,
              a,
              f,
              t,
              C,
              M,
              $,
              s
            ],
            eo: [
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              1,
              0,
              0,
              1,
              1
            ]
          },
          {
            // E
            center: [
              G,
              v,
              L,
              i,
              n,
              R
            ],
            cp: [
              Y,
              Q,
              j,
              K,
              u,
              l,
              c,
              p
            ],
            co: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            ep: [
              V,
              ee,
              re,
              $,
              d,
              a,
              f,
              s,
              M,
              t,
              r,
              C
            ],
            eo: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              1
            ]
          },
          {
            // M
            center: [
              n,
              R,
              G,
              v,
              L,
              i
            ],
            cp: [
              Y,
              Q,
              j,
              K,
              u,
              l,
              c,
              p
            ],
            co: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            ep: [
              V,
              $,
              re,
              s,
              d,
              ee,
              f,
              a,
              C,
              M,
              t,
              r
            ],
            eo: [
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              0,
              0,
              0
            ]
          },
          {
            // S
            center: [
              L,
              G,
              v,
              R,
              i,
              n
            ],
            cp: [
              Y,
              Q,
              j,
              K,
              u,
              l,
              c,
              p
            ],
            co: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            ep: [
              re,
              ee,
              f,
              $,
              V,
              a,
              d,
              s,
              C,
              M,
              t,
              r
            ],
            eo: [
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              0,
              0,
              0,
              0
            ]
          }
        ], oe = {
          U: 0,
          R: 1,
          F: 2,
          D: 3,
          L: 4,
          B: 5,
          E: 6,
          M: 7,
          S: 8,
          x: 9,
          y: 10,
          z: 11,
          u: 12,
          r: 13,
          f: 14,
          d: 15,
          l: 16,
          b: 17
        }, se = {
          0: "U",
          1: "R",
          2: "F",
          3: "D",
          4: "L",
          5: "B",
          6: "E",
          7: "M",
          8: "S",
          9: "x",
          10: "y",
          11: "z",
          12: "u",
          13: "r",
          14: "f",
          15: "d",
          16: "l",
          17: "b"
        }, de = function(me) {
          var T, x, b, P, F, U, H;
          if (typeof me == "string") {
            for (U = me.split(/\s+/), H = [], T = 0, x = U.length; T < x; T++)
              if (P = U[T], P.length !== 0) {
                if (P.length > 2)
                  throw new Error(`Invalid move: ${P}`);
                if (b = oe[P[0]], b === void 0)
                  throw new Error(`Invalid move: ${P}`);
                if (P.length === 1)
                  F = 0;
                else if (P[1] === "2")
                  F = 1;
                else if (P[1] === "'")
                  F = 2;
                else
                  throw new Error(`Invalid move: ${P}`);
                H.push(b * 3 + F);
              }
            return H;
          } else return me.length != null ? me : [me];
        }, q.moves.push(new q().move("R M' L'").toJSON()), q.moves.push(new q().move("U E' D'").toJSON()), q.moves.push(new q().move("F S B'").toJSON()), q.moves.push(new q().move("U E'").toJSON()), q.moves.push(new q().move("R M'").toJSON()), q.moves.push(new q().move("F S").toJSON()), q.moves.push(new q().move("D E").toJSON()), q.moves.push(new q().move("L M").toJSON()), q.moves.push(new q().move("B S'").toJSON()), q;
      }).call(this), e !== null ? e.exports = o : this.Cube = o;
    }).call(Tf);
  })(Xt)), Xt.exports;
}
var Yr = {}, es;
function Mf() {
  return es || (es = 1, (function() {
    var e, n, t, r, o, i, s, c, a, u, f, l, d, p, v, M, C, L, R, G, $, K, ee, Q, re, j, V, Y, ce, ae, he, J, le, ue, se, oe, de, q, me, T, x, b, P, F, U, H, te, N, X, z, pe, be, xe = [].indexOf;
    r = this.Cube || Tc(), [le, ce, he, V, c, u, i, l] = [0, 1, 2, 3, 4, 5, 6, 7], [J, Y, ae, j, f, s, a, o, p, d, e, n] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], t = function(h, g) {
      var w, S, m;
      if (h < g)
        return 0;
      for (g > h / 2 && (g = h - g), m = 1, w = h, S = 1; w !== h - g; )
        m *= w, m /= S, w--, S++;
      return m;
    }, T = function(h) {
      var g, w, S, m;
      for (g = 1, w = S = 2, m = h; 2 <= m ? S <= m : S >= m; w = 2 <= m ? ++S : --S)
        g *= w;
      return g;
    }, b = function(h, g) {
      return h > g ? h : g;
    }, z = function(h, g, w) {
      var S, m, y, A, _;
      for (_ = h[g], S = m = y = g, A = w - 1; y <= A ? m <= A : m >= A; S = y <= A ? ++m : --m)
        h[S] = h[S + 1];
      return h[w] = _;
    }, pe = function(h, g, w) {
      var S, m, y, A, _;
      for (_ = h[w], S = m = y = w, A = g + 1; y <= A ? m <= A : m >= A; S = y <= A ? ++m : --m)
        h[S] = h[S - 1];
      return h[g] = _;
    }, te = function(h, g, w, S = !1) {
      var m, y, A, _, k, ie;
      return _ = w - g, A = T(_ + 1), h === "corners" ? (y = 7, ie = "cp") : (y = 11, ie = "ep"), k = (function() {
        var B, E, O;
        for (O = [], m = B = 0, E = _; 0 <= E ? B <= E : B >= E; m = 0 <= E ? ++B : --B)
          O.push(0);
        return O;
      })(), function(B) {
        var E, O, W, D, fe, ge, ve, Ae, Ve, Nn, Ln, $n, Kr, kn, Bn, Xr, jn, Wr, Ji, Vn, Qi, qn, Gn, Kn, Oe, Xn, Wn;
        if (B != null) {
          for (m = ge = 0, Ln = _; 0 <= Ln ? ge <= Ln : ge >= Ln; m = 0 <= Ln ? ++ge : --ge)
            k[m] = m + g;
          for (O = B % A, E = B / A | 0, Ve = this[ie], m = ve = 0, $n = y; 0 <= $n ? ve <= $n : ve >= $n; m = 0 <= $n ? ++ve : --ve)
            Ve[m] = -1;
          for (D = Ae = 1, kn = _; 1 <= kn ? Ae <= kn : Ae >= kn; D = 1 <= kn ? ++Ae : --Ae)
            for (fe = O % (D + 1), O = O / (D + 1) | 0; fe > 0; )
              pe(k, 0, D), fe--;
          if (Oe = _, S)
            for (D = Nn = 0, Bn = y; 0 <= Bn ? Nn <= Bn : Nn >= Bn; D = 0 <= Bn ? ++Nn : --Nn)
              W = t(y - D, Oe + 1), E - W >= 0 && (Ve[D] = k[_ - Oe], E -= W, Oe--);
          else
            for (D = qn = Xr = y; Xr <= 0 ? qn <= 0 : qn >= 0; D = Xr <= 0 ? ++qn : --qn)
              W = t(D, Oe + 1), E - W >= 0 && (Ve[D] = k[Oe], E -= W, Oe--);
          return this;
        } else {
          for (Ve = this[ie], m = Gn = 0, jn = _; 0 <= jn ? Gn <= jn : Gn >= jn; m = 0 <= jn ? ++Gn : --Gn)
            k[m] = -1;
          if (E = O = Oe = 0, S)
            for (D = Kn = Wr = y; Wr <= 0 ? Kn <= 0 : Kn >= 0; D = Wr <= 0 ? ++Kn : --Kn)
              g <= (Ji = Ve[D]) && Ji <= w && (E += t(y - D, Oe + 1), k[_ - Oe] = Ve[D], Oe++);
          else
            for (D = Xn = 0, Vn = y; 0 <= Vn ? Xn <= Vn : Xn >= Vn; D = 0 <= Vn ? ++Xn : --Xn)
              g <= (Qi = Ve[D]) && Qi <= w && (E += t(D, Oe + 1), k[Oe] = Ve[D], Oe++);
          for (D = Wn = Kr = _; Kr <= 0 ? Wn <= 0 : Wn >= 0; D = Kr <= 0 ? ++Wn : --Wn) {
            for (fe = 0; k[D] !== g + D; )
              z(k, 0, D), fe++;
            O = (D + 1) * O + fe;
          }
          return E * A + O;
        }
      };
    }, v = {
      // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
      // the DRB corner is fully determined by the orientation of the other
      // corners.
      twist: function(h) {
        var g, w, S, m, y, A;
        if (h != null) {
          for (y = 0, g = w = 6; w >= 0; g = --w)
            m = h % 3, h = h / 3 | 0, this.co[g] = m, y += m;
          return this.co[7] = (3 - y % 3) % 3, this;
        } else {
          for (A = 0, g = S = 0; S <= 6; g = ++S)
            A = 3 * A + this.co[g];
          return A;
        }
      },
      // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
      // BR edge is fully determined by the orientation of the other edges.
      flip: function(h) {
        var g, w, S, m, y, A;
        if (h != null) {
          for (y = 0, g = w = 10; w >= 0; g = --w)
            m = h % 2, h = h / 2 | 0, this.eo[g] = m, y += m;
          return this.eo[11] = (2 - y % 2) % 2, this;
        } else {
          for (A = 0, g = S = 0; S <= 10; g = ++S)
            A = 2 * A + this.eo[g];
          return A;
        }
      },
      // Parity of the corner permutation
      cornerParity: function() {
        var h, g, w, S, m, y, A, _, k;
        for (k = 0, h = w = m = l, y = le + 1; m <= y ? w <= y : w >= y; h = m <= y ? ++w : --w)
          for (g = S = A = h - 1, _ = le; A <= _ ? S <= _ : S >= _; g = A <= _ ? ++S : --S)
            this.cp[g] > this.cp[h] && k++;
        return k % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var h, g, w, S, m, y, A, _, k;
        for (k = 0, h = w = m = n, y = J + 1; m <= y ? w <= y : w >= y; h = m <= y ? ++w : --w)
          for (g = S = A = h - 1, _ = J; A <= _ ? S <= _ : S >= _; g = A <= _ ? ++S : --S)
            this.ep[g] > this.ep[h] && k++;
        return k % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: te("corners", le, u),
      // Permutation of the three edges UR, UF, UL
      URtoUL: te("edges", J, ae),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: te("edges", j, s),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: te("edges", J, s),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: te("edges", p, n, !0)
    };
    for (x in v)
      be = v[x], r.prototype[x] = be;
    oe = function(h, g, w) {
      var S, m, y, A, _, k, ie, B, E, O, W;
      for (S = h === "corners" ? "cornerMultiply" : "edgeMultiply", m = new r(), W = [], y = k = 0, O = w - 1; 0 <= O ? k <= O : k >= O; y = 0 <= O ? ++k : --k) {
        for (m[g](y), A = [], _ = B = 0; B <= 5; _ = ++B) {
          for (ie = r.moves[_], E = 0; E <= 2; ++E)
            m[S](ie), A.push(m[g]());
          m[S](ie);
        }
        W.push(A);
      }
      return W;
    }, P = (function() {
      var h, g;
      return h = new r(), g = new r(), function(w, S) {
        var m, y;
        for (h.URtoUL(w), g.UBtoDF(S), m = y = 0; y <= 7; m = ++y)
          if (h.ep[m] !== -1) {
            if (g.ep[m] !== -1)
              return -1;
            g.ep[m] = h.ep[m];
          }
        return g.URtoDF();
      };
    })(), $ = 2187, M = 2048, L = 2, C = 11880, R = 495, G = 24, ee = 20160, Q = 20160, re = 1320, K = 1320, r.moveTables = {
      parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
      twist: null,
      flip: null,
      FRtoBR: null,
      URFtoDLF: null,
      URtoDF: null,
      URtoUL: null,
      UBtoDF: null,
      mergeURtoDF: null
    }, F = {
      // name: [scope, size]
      twist: ["corners", $],
      flip: ["edges", M],
      FRtoBR: ["edges", C],
      URFtoDLF: ["corners", ee],
      URtoDF: ["edges", Q],
      URtoUL: ["edges", re],
      UBtoDF: ["edges", K],
      mergeURtoDF: []
    }, r.computeMoveTables = function(...h) {
      var g, w, S, m, y, A;
      for (h.length === 0 && (h = (function() {
        var _;
        _ = [];
        for (S in F)
          _.push(S);
        return _;
      })()), w = 0, g = h.length; w < g; w++)
        A = h[w], this.moveTables[A] === null && (A === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var _, k, ie, B;
          for (B = [], k = ie = 0; ie <= 335; k = ++ie)
            B.push((function() {
              var E, O;
              for (O = [], _ = E = 0; E <= 335; _ = ++E)
                O.push(P(k, _));
              return O;
            })());
          return B;
        })() : ([m, y] = F[A], this.moveTables[A] = oe(m, A, y)));
      return this;
    }, ue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], U = (function() {
      var h, g, w, S, m, y, A, _;
      for (_ = [], g = w = 0; w <= 5; g = ++w) {
        for (S = [], h = m = 0; m <= 5; h = ++m)
          if (h !== g && h !== g - 3)
            for (A = y = 0; y <= 2; A = ++y)
              S.push(h * 3 + A);
        _.push(S);
      }
      return _;
    })(), se = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], H = (function() {
      var h, g, w, S, m, y, A, _, k, ie;
      for (ie = [], g = S = 0; S <= 5; g = ++S) {
        for (m = [], h = y = 0; y <= 5; h = ++y)
          if (h !== g && h !== g - 3)
            for (k = h === 0 || h === 3 ? [0, 1, 2] : [1], A = 0, w = k.length; A < w; A++)
              _ = k[A], m.push(h * 3 + _);
        ie.push(m);
      }
      return ie;
    })(), N = function(h, g, w) {
      var S, m, y;
      return S = g % 8, y = g >> 3, m = S << 2, w != null ? (h[y] &= ~(15 << m), h[y] |= w << m, w) : (h[y] & 15 << m) >>> m;
    }, de = function(h, g, w, S) {
      var m, y, A, _, k, ie, B, E, O, W, D, fe;
      for (fe = (function() {
        var ge, ve, Ae;
        for (Ae = [], ge = 0, ve = Math.ceil(g / 8) - 1; 0 <= ve ? ge <= ve : ge >= ve; 0 <= ve ? ++ge : --ge)
          Ae.push(4294967295);
        return Ae;
      })(), h === 1 ? E = ue : E = se, y = 0, N(fe, 0, y), A = 1; A !== g; ) {
        for (_ = ie = 0, D = g - 1; 0 <= D ? ie <= D : ie >= D; _ = 0 <= D ? ++ie : --ie)
          if (N(fe, _) === y)
            for (m = w(_), W = 0, k = E.length; W < k; W++)
              B = E[W], O = S(m, B), N(fe, O) === 15 && (N(fe, O, y + 1), A++);
        y++;
      }
      return fe;
    }, r.pruningTables = {
      sliceTwist: null,
      sliceFlip: null,
      sliceURFtoDLFParity: null,
      sliceURtoDFParity: null
    }, X = {
      // name: [phase, size, currentCoords, nextIndex]
      sliceTwist: [
        1,
        R * $,
        function(h) {
          return [
            h % R,
            h / R | 0
          ];
        },
        function(h, g) {
          var w, S, m, y;
          return [
            m,
            y
          ] = h, w = r.moveTables.FRtoBR[m * 24][g] / 24 | 0, S = r.moveTables.twist[y][g], S * R + w;
        }
      ],
      sliceFlip: [
        1,
        R * M,
        function(h) {
          return [
            h % R,
            h / R | 0
          ];
        },
        function(h, g) {
          var w, S, m, y;
          return [
            y,
            w
          ] = h, m = r.moveTables.FRtoBR[y * 24][g] / 24 | 0, S = r.moveTables.flip[w][g], S * R + m;
        }
      ],
      sliceURFtoDLFParity: [
        2,
        G * ee * L,
        function(h) {
          return [
            h % 2,
            (h / 2 | 0) % G,
            (h / 2 | 0) / G | 0
          ];
        },
        function(h, g) {
          var w, S, m, y, A, _;
          return [
            A,
            _,
            w
          ] = h, S = r.moveTables.parity[A][g], m = r.moveTables.FRtoBR[_][g], y = r.moveTables.URFtoDLF[w][g], (y * G + m) * 2 + S;
        }
      ],
      sliceURtoDFParity: [
        2,
        G * Q * L,
        function(h) {
          return [
            h % 2,
            (h / 2 | 0) % G,
            (h / 2 | 0) / G | 0
          ];
        },
        function(h, g) {
          var w, S, m, y, A, _;
          return [
            A,
            _,
            w
          ] = h, S = r.moveTables.parity[A][g], m = r.moveTables.FRtoBR[_][g], y = r.moveTables.URtoDF[w][g], (y * G + m) * 2 + S;
        }
      ]
    }, r.computePruningTables = function(...h) {
      var g, w, S, m, y;
      for (h.length === 0 && (h = (function() {
        var A;
        A = [];
        for (S in X)
          A.push(S);
        return A;
      })()), w = 0, g = h.length; w < g; w++)
        y = h[w], this.pruningTables[y] === null && (m = X[y], this.pruningTables[y] = de(...m));
      return this;
    }, r.initSolver = function() {
      return r.computeMoveTables(), r.computePruningTables();
    }, r.prototype.solveUpright = function(h = 22) {
      var g, w, S, m, y, A, _, k, ie;
      return S = (function() {
        var B, E, O, W, D, fe, ge;
        for (E = ["U", "R", "F", "D", "L", "B"], fe = ["", "2", "'"], ge = [], B = O = 0; O <= 5; B = ++O)
          for (D = W = 0; W <= 2; D = ++W)
            ge.push(E[B] + fe[D]);
        return ge;
      })(), g = class {
        constructor(E) {
          this.parent = null, this.lastMove = null, this.depth = 0, E && this.init(E);
        }
        init(E) {
          return this.flip = E.flip(), this.twist = E.twist(), this.slice = E.FRtoBR() / G | 0, this.parity = E.cornerParity(), this.URFtoDLF = E.URFtoDLF(), this.FRtoBR = E.FRtoBR(), this.URtoUL = E.URtoUL(), this.UBtoDF = E.UBtoDF(), this;
        }
        solution() {
          return this.parent ? this.parent.solution() + S[this.lastMove] + " " : "";
        }
        //# Helpers
        move(E, O, W) {
          return r.moveTables[E][O][W];
        }
        pruning(E, O) {
          return N(r.pruningTables[E], O);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? U[this.lastMove / 3 | 0] : ue;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var E, O;
          return E = this.pruning("sliceFlip", R * this.flip + this.slice), O = this.pruning("sliceTwist", R * this.twist + this.slice), b(E, O);
        }
        // Compute the next phase 1 state for the given move
        next1(E) {
          var O;
          return O = w.pop(), O.parent = this, O.lastMove = E, O.depth = this.depth + 1, O.flip = this.move("flip", this.flip, E), O.twist = this.move("twist", this.twist, E), O.slice = this.move("FRtoBR", this.slice * 24, E) / 24 | 0, O;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? H[this.lastMove / 3 | 0] : se;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var E, O, W, D;
          return W = (G * this.URtoDF + this.FRtoBR) * L + this.parity, E = this.pruning("sliceURtoDFParity", W), D = (G * this.URFtoDLF + this.FRtoBR) * L + this.parity, O = this.pruning("sliceURFtoDLFParity", D), b(E, O);
        }
        // Initialize phase 2 coordinates
        init2(E = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), E))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(E) {
          var O;
          return O = w.pop(), O.parent = this, O.lastMove = E, O.depth = this.depth + 1, O.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, E), O.FRtoBR = this.move("FRtoBR", this.FRtoBR, E), O.parity = this.move("parity", this.parity, E), O.URtoDF = this.move("URtoDF", this.URtoDF, E), O;
        }
      }, k = null, y = function(B) {
        var E, O, W, D;
        for (E = 0, D = [], E = O = 1, W = h; (1 <= W ? O <= W : O >= W) && (m(B, E), k === null); E = 1 <= W ? ++O : --O)
          D.push(E++);
        return D;
      }, m = function(B, E) {
        var O, W, D, fe, ge, ve, Ae;
        if (E === 0) {
          if (B.minDist1() === 0 && (B.lastMove === null || (ge = B.lastMove, xe.call(se, ge) < 0)))
            return _(B);
        } else if (E > 0 && B.minDist1() <= E) {
          for (ve = B.moves1(), Ae = [], W = 0, O = ve.length; W < O && (D = ve[W], fe = B.next1(D), m(fe, E - 1), w.push(fe), k === null); W++)
            Ae.push(void 0);
          return Ae;
        }
      }, _ = function(B) {
        var E, O, W, D;
        for (B.init2(), D = [], E = O = 1, W = h - B.depth; (1 <= W ? O <= W : O >= W) && (A(B, E), k === null); E = 1 <= W ? ++O : --O)
          D.push(E++);
        return D;
      }, A = function(B, E) {
        var O, W, D, fe, ge, ve;
        if (E === 0) {
          if (B.minDist2() === 0)
            return k = B.solution();
        } else if (E > 0 && B.minDist2() <= E) {
          for (ge = B.moves2(), ve = [], W = 0, O = ge.length; W < O && (D = ge[W], fe = B.next2(D), A(fe, E - 1), w.push(fe), k === null); W++)
            ve.push(void 0);
          return ve;
        }
      }, w = (function() {
        var B, E, O;
        for (O = [], B = 0, E = h + 1; 0 <= E ? B <= E : B >= E; 0 <= E ? ++B : --B)
          O.push(new g());
        return O;
      })(), ie = w.pop().init(this), y(ie), w.push(ie), k.length > 0 && (k = k.substring(0, k.length - 1)), k;
    }, me = {
      U: 0,
      R: 1,
      F: 2,
      D: 3,
      L: 4,
      B: 5
    }, q = {
      0: "U",
      1: "R",
      2: "F",
      3: "D",
      4: "L",
      5: "B"
    }, r.prototype.solve = function(h = 22) {
      var g, w, S, m, y, A, _, k, ie;
      for (g = this.clone(), k = g.upright(), g.move(k), A = new r().move(k).center, ie = g.solveUpright(h), _ = [], y = ie.split(" "), S = 0, w = y.length; S < w; S++)
        m = y[S], _.push(q[A[me[m[0]]]]), m.length > 1 && (_[_.length - 1] += m[1]);
      return _.join(" ");
    }, r.scramble = function() {
      return r.inverse(r.random().solve());
    };
  }).call(Yr)), Yr;
}
var Hr, ns;
function Af() {
  return ns || (ns = 1, Hr = Tc(), Mf()), Hr;
}
var Rf = Af();
const Be = /* @__PURE__ */ Of(Rf), zr = 4294967296;
function Mc() {
  const e = globalThis.crypto;
  if (!(e != null && e.getRandomValues))
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  const n = new Uint32Array(1);
  return e.getRandomValues(n), n[0];
}
function vt(e, n = Mc) {
  if (!Number.isSafeInteger(e) || e < 1 || e > zr)
    throw new RangeError("Invalid random integer range");
  const t = Math.floor(zr / e) * e;
  for (; ; ) {
    const r = n();
    if (!Number.isInteger(r) || r < 0 || r >= zr)
      throw new RangeError("Random source must return a uint32");
    if (r < t)
      return r % e;
  }
}
function Pf(e, n = Mc) {
  const t = [...e];
  for (let r = t.length - 1; r > 0; r--) {
    const o = vt(r + 1, n);
    [t[r], t[o]] = [t[o], t[r]];
  }
  return t;
}
function ir(e, n) {
  if (!Number.isSafeInteger(e) || e < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return Pf(
    Array.from({ length: e }, (t, r) => r),
    n
  );
}
function sr(e) {
  let n = 0;
  for (let t = 0; t < e.length; t++)
    for (let r = t + 1; r < e.length; r++)
      e[t] > e[r] && (n ^= 1);
  return n;
}
function ts(e, n) {
  return !Array.isArray(e) || e.length !== n ? !1 : new Set(e).size === n && e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < n
  );
}
function _f(e) {
  return Array.isArray(e) && e.length === 6 && e.every((n, t) => n === t);
}
function rs(e, n, t) {
  return !Array.isArray(e) || e.length !== n || !e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < t
  ) ? !1 : e.reduce((r, o) => r + o, 0) % t === 0;
}
function Cf(e) {
  if (!e || typeof e != "object")
    return !1;
  const { center: n, cp: t, co: r, ep: o, eo: i } = e;
  return n !== void 0 && !_f(n) || !ts(t, 8) || !ts(o, 12) || !rs(r, 8, 3) || !rs(i, 12, 2) ? !1 : sr(t) === sr(o);
}
function Uf(e) {
  if (!Cf(e))
    throw new Error("Invalid 3x3 cube state");
  return e;
}
function os(e, n, t) {
  const r = [];
  let o = 0;
  for (let i = 0; i < e - 1; i++) {
    const s = vt(n, t);
    r.push(s), o += s;
  }
  return r.push((n - o % n) % n), r;
}
function If(e) {
  let n, t;
  do
    n = ir(8, e), t = ir(12, e);
  while (sr(n) !== sr(t));
  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: n,
    co: os(8, 3, e),
    ep: t,
    eo: os(12, 2, e)
  };
}
let Pt;
async function Ff() {
  Pt || (Pt = Promise.resolve().then(() => {
    Be.initSolver();
  }));
  try {
    await Pt;
  } catch (e) {
    throw Pt = void 0, e;
  }
}
function jo(e) {
  return Uf(e), new Be({
    center: e.center ?? [0, 1, 2, 3, 4, 5],
    cp: e.cp,
    co: e.co,
    ep: e.ep,
    eo: e.eo
  });
}
function Df(e) {
  const n = jo(e), t = n.solve();
  if (typeof t != "string" || !t.trim())
    throw new Error("Solver did not return a valid solution");
  if (!n.clone().move(t).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return t.trim();
}
function Nf(e) {
  return Be.inverse(e).trim();
}
const Lf = ["U", "R", "F", "D", "L", "B"], $f = ["", "2", "'"];
let Jr;
function kf() {
  if (!Jr) {
    const e = /* @__PURE__ */ new Set();
    e.add(new Be().asString());
    for (const n of Lf)
      for (const t of $f)
        e.add(
          new Be().move(n + t).asString()
        );
    Jr = e;
  }
  return Jr;
}
function Bf(e) {
  const n = jo(e);
  return !kf().has(n.asString());
}
function jf(e) {
  for (; ; ) {
    const n = If(e);
    if (Bf(n))
      return {
        stateData: n,
        cube: jo(n)
      };
  }
}
async function Vf(e) {
  await Ff();
  const { stateData: n, cube: t } = jf(e), r = Df(n), o = Nf(r);
  if (new Be().move(o).asString() !== t.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!t.clone().move(r).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: o,
    moves: o.split(/\s+/),
    state: n
  };
}
const Ac = 8, xo = 6;
function qf(e) {
  let n = 0;
  for (let t = 0; t < e.length; t++)
    for (let r = t + 1; r < e.length; r++)
      e[t] > e[r] && (n ^= 1);
  return n;
}
function Gf(e, n) {
  return !Array.isArray(e) || e.length !== n ? !1 : new Set(e).size === n && e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < n
  );
}
function Kf(e) {
  return !Array.isArray(e) || e.length !== Ac || !e.every(
    (n) => Number.isInteger(n) && n >= 0 && n < 3
  ) ? !1 : e[xo] === 0 && e.reduce((n, t) => n + t, 0) % 3 === 0;
}
function Xf(e) {
  return !e || typeof e != "object" || !Gf(e.cp, Ac) || !Kf(e.co) ? !1 : e.cp[xo] === xo;
}
function br(e) {
  if (!Xf(e))
    throw new Error("Invalid 2x2 cube state");
  return e;
}
const Wf = [0, 1, 2, 3, 4, 5, 7], is = [0, 1, 2, 3, 4, 5, 7];
function Yf(e) {
  const n = ir(7, e), t = Array(8).fill(0);
  t[6] = 6;
  for (let r = 0; r < is.length; r++)
    t[is[r]] = Wf[n[r]];
  return t;
}
function Hf(e) {
  const n = Array(8).fill(0);
  let t = 0;
  for (let r = 0; r < 6; r++)
    n[r] = vt(3, e), t += n[r];
  return n[6] = 0, n[7] = (3 - t % 3) % 3, n;
}
function zf(e) {
  return br({
    cp: Yf(e),
    co: Hf(e)
  });
}
const ot = [
  "U",
  "U2",
  "U'",
  "R",
  "R2",
  "R'",
  "F",
  "F2",
  "F'"
], Jf = [2, 1, 0, 5, 4, 3, 8, 7, 6], Qf = [0, 0, 0, 1, 1, 1, 2, 2, 2], Rc = [0, 1, 2, 3, 4, 5, 7], Pc = [0, 1, 2, 3, 4, 5, 7], Qr = 5040, Zr = 729, Ce = ot.length, _c = [1, 1, 2, 6, 24, 120, 720, 5040];
let Oo = null;
function Zf(e) {
  if (br(e), e.cp[6] !== 6 || e.co[6] !== 0)
    throw new Error(
      "2×2 state is not reachable using only U, R and F turns"
    );
  return e;
}
function Cc(e) {
  const n = Pc.map((r) => {
    const o = Rc.indexOf(e[r]);
    if (o === -1)
      throw new Error("Invalid movable-corner permutation");
    return o;
  });
  let t = 0;
  for (let r = 0; r < 7; r++) {
    let o = 0;
    for (let i = r + 1; i < 7; i++)
      n[i] < n[r] && o++;
    t += o * _c[6 - r];
  }
  return t;
}
function el(e) {
  const n = Array.from({ length: 7 }, (o, i) => i), t = [];
  for (let o = 0; o < 7; o++) {
    const i = _c[6 - o], s = Math.floor(e / i);
    e %= i, t.push(n.splice(s, 1)[0]);
  }
  const r = Array(8).fill(0);
  r[6] = 6;
  for (let o = 0; o < 7; o++)
    r[Pc[o]] = Rc[t[o]];
  return r;
}
function Uc(e) {
  let n = 0;
  for (let t = 0; t < 6; t++)
    n = n * 3 + e[t];
  return n;
}
function nl(e) {
  const n = Array(8).fill(0);
  let t = 0;
  for (let r = 5; r >= 0; r--)
    n[r] = e % 3, t += n[r], e = Math.floor(e / 3);
  return n[6] = 0, n[7] = (3 - t % 3) % 3, n;
}
function tl(e, n) {
  return n.cp.map((t) => e[t]);
}
function rl(e, n) {
  return n.cp.map(
    (t, r) => (e[t] + n.co[r]) % 3
  );
}
function ss(e, n, t) {
  const r = new Int8Array(e);
  r.fill(-1), r[0] = 0;
  const o = new Int32Array(e);
  let i = 0, s = 1;
  for (o[0] = 0; i < s; ) {
    const c = o[i++], a = r[c] + 1;
    for (let u = 0; u < Ce; u++) {
      const f = n[c * Ce + u];
      r[f] === -1 && (r[f] = a, o[s++] = f);
    }
  }
  if (s !== e)
    throw new Error(
      `Incomplete ${t} pruning table: reached ${s} of ${e} coordinates`
    );
  return r;
}
function Ic() {
  if (Oo)
    return;
  const e = ot.map((r) => {
    const o = new Be();
    return o.move(r), {
      cp: Array.from(o.cp),
      co: Array.from(o.co)
    };
  }), n = new Uint16Array(
    Qr * Ce
  );
  for (let r = 0; r < Qr; r++) {
    const o = el(r);
    for (let i = 0; i < Ce; i++) {
      const s = tl(o, e[i]);
      n[r * Ce + i] = Cc(s);
    }
  }
  const t = new Uint16Array(
    Zr * Ce
  );
  for (let r = 0; r < Zr; r++) {
    const o = nl(r);
    for (let i = 0; i < Ce; i++) {
      const s = rl(o, e[i]);
      t[r * Ce + i] = Uc(s);
    }
  }
  Oo = {
    permutationMoves: n,
    orientationMoves: t,
    permutationDistances: ss(
      Qr,
      n,
      "permutation"
    ),
    orientationDistances: ss(
      Zr,
      t,
      "orientation"
    )
  };
}
function ol() {
  Ic();
}
function il(e) {
  br(e);
  const n = Array.from({ length: 12 }, (t, r) => r);
  return qf(e.cp) !== 0 && ([n[0], n[1]] = [n[1], n[0]]), {
    center: [0, 1, 2, 3, 4, 5],
    cp: [...e.cp],
    co: [...e.co],
    ep: n,
    eo: Array(12).fill(0)
  };
}
function sl(e) {
  return new Be(il(e));
}
function cl(e) {
  if (typeof e != "string")
    throw new TypeError("Solution must be a string");
  return (e.trim() === "" ? [] : e.trim().split(/\s+/)).reverse().map((t) => {
    const r = ot.indexOf(t);
    if (r === -1)
      throw new RangeError(`Unsupported 2×2 move: "${t}"`);
    return ot[Jf[r]];
  }).join(" ");
}
function al(e) {
  Zf(e), Ic();
  const n = Cc(e.cp), t = Uc(e.co);
  if (n === 0 && t === 0)
    return "";
  const {
    permutationMoves: r,
    orientationMoves: o,
    permutationDistances: i,
    orientationDistances: s
  } = Oo, c = [], a = 20;
  function u(l, d, p, v) {
    if (l === 0 && d === 0)
      return !0;
    if (Math.max(
      i[l],
      s[d]
    ) > p || p === 0)
      return !1;
    for (let C = 0; C < Ce; C++) {
      const L = Qf[C];
      if (L === v)
        continue;
      const R = r[l * Ce + C], G = o[d * Ce + C];
      if (c.push(C), u(R, G, p - 1, L))
        return !0;
      c.pop();
    }
    return !1;
  }
  const f = Math.max(
    i[n],
    s[t]
  );
  for (let l = f; l <= a; l++)
    if (c.length = 0, u(n, t, l, -1))
      return c.map((d) => ot[d]).join(" ");
  throw new Error(
    "Could not find a 2×2 solution within the search limit."
  );
}
const ul = ["U", "R", "F", "D", "L", "B"], fl = ["", "2", "'"];
let eo;
function To(e) {
  return `${Array.from(e.cp).join(",")}|${Array.from(e.co).join(",")}`;
}
function ll() {
  if (!eo) {
    const e = /* @__PURE__ */ new Set();
    e.add(To({
      cp: [0, 1, 2, 3, 4, 5, 6, 7],
      co: Array(8).fill(0)
    }));
    for (const n of ul)
      for (const t of fl) {
        const r = new Be().move(n + t);
        e.add(To({
          cp: r.cp,
          co: r.co
        }));
      }
    eo = e;
  }
  return eo;
}
function dl(e) {
  return br(e), !ll().has(To(e));
}
function pl(e) {
  for (; ; ) {
    const n = zf(e);
    if (dl(n))
      return {
        state: n,
        cube: sl(n)
      };
  }
}
function hl(e, n) {
  return Array.from(e.cp).every((t, r) => t === n.cp[r]) && Array.from(e.co).every((t, r) => t === n.co[r]);
}
async function ml(e) {
  await ol();
  const { state: n, cube: t } = pl(e), r = al(n), o = cl(r), i = new Be().move(o);
  if (!hl(i, n))
    throw new Error(
      "2×2 scramble replay failed: generated corner state does not match target"
    );
  const s = t.clone().move(r);
  if (!Array.from(s.cp).every((c, a) => c === a) || !Array.from(s.co).every((c) => c === 0))
    throw new Error(
      "2×2 solution verification failed: corners did not return to identity"
    );
  return {
    event: "222",
    notation: o,
    moves: o.split(/\s+/),
    state: n
  };
}
function Fc(e) {
  return Array.from({ length: e }, (n, t) => t);
}
const gl = {
  U: 0,
  L: 1,
  R: 2,
  B: 3
}, Dc = {
  U: [0, 1, 2],
  L: [0, 4, 3],
  R: [1, 3, 5],
  B: [2, 4, 5]
};
function vl(e) {
  const n = Fc(6), t = Array(6).fill(0), [r, o, i] = Dc[e];
  return n[r] = i, n[o] = r, n[i] = o, t[r] = 1, t[o] = 1, { src: n, flip: t };
}
function wl(e) {
  const n = Array(6).fill(0);
  for (let r = 0; r < 6; r++)
    n[e.src[r]] = r;
  const t = n.map(
    (r) => e.flip[r]
  );
  return { src: n, flip: t };
}
const Wt = {};
for (const e of Object.keys(Dc))
  Wt[e] = vl(e), Wt[`${e}'`] = wl(Wt[e]);
function Vo() {
  return {
    ep: Fc(6),
    eo: Array(6).fill(0),
    tips: Array(4).fill(0)
  };
}
function Nc(e) {
  let n = 0;
  for (let t = 0; t < e.length; t++)
    for (let r = t + 1; r < e.length; r++)
      e[t] > e[r] && (n ^= 1);
  return n;
}
function Sl(e, n) {
  return !Array.isArray(e) || e.length !== n || !e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < n
  ) ? !1 : new Set(e).size === n;
}
function El(e) {
  return Array.isArray(e) && e.length === 6 && e.every((n) => n === 0 || n === 1) && e.reduce((n, t) => n + t, 0) % 2 === 0;
}
function yl(e) {
  return Array.isArray(e) && e.length === 4 && e.every(
    (n) => Number.isInteger(n) && n >= 0 && n < 3
  );
}
function bl(e) {
  return !e || typeof e != "object" ? !1 : Sl(e.ep, 6) && Nc(e.ep) === 0 && El(e.eo) && yl(e.tips);
}
function qo(e) {
  if (!bl(e))
    throw new Error("Invalid Pyraminx state");
  return e;
}
function Go(e, n) {
  const t = /^([ULRBulrb])('?)$/.exec(n);
  if (!t)
    throw new RangeError(`Unsupported Pyraminx move: "${n}"`);
  const [, r, o] = t, i = r.toUpperCase(), s = gl[i], c = o ? 2 : 1, a = {
    ep: [...e.ep],
    eo: [...e.eo],
    tips: [...e.tips]
  };
  if (r === r.toLowerCase())
    return a.tips[s] = (a.tips[s] + c) % 3, a;
  const u = Wt[n];
  return a.ep = u.src.map((f) => e.ep[f]), a.eo = u.src.map(
    (f, l) => e.eo[f] ^ u.flip[l]
  ), a.tips[s] = (a.tips[s] + c) % 3, a;
}
function Mo(e, n) {
  return (n.trim() === "" ? [] : n.trim().split(/\s+/)).reduce(
    (r, o) => Go(r, o),
    {
      ep: [...e.ep],
      eo: [...e.eo],
      tips: [...e.tips]
    }
  );
}
function xl(e) {
  for (; ; ) {
    const n = ir(6, e);
    if (Nc(n) === 0)
      return n;
  }
}
function Ol(e) {
  const n = [];
  let t = 0;
  for (let r = 0; r < 5; r++) {
    const o = vt(2, e);
    n.push(o), t += o;
  }
  return n.push(t % 2), n;
}
function Tl(e) {
  return Array.from(
    { length: 4 },
    () => vt(3, e)
  );
}
function Ml(e) {
  return {
    ep: xl(e),
    eo: Ol(e),
    tips: Tl(e)
  };
}
const Lc = [
  "U",
  "U'",
  "L",
  "L'",
  "R",
  "R'",
  "B",
  "B'"
], cs = 11520;
let cr;
function Qn(e) {
  return `${e.ep.join(",")}|${e.eo.join(",")}`;
}
function ar(e) {
  return {
    ep: [...e.ep],
    eo: [...e.eo],
    tips: [0, 0, 0, 0]
  };
}
function Ko() {
  if (cr)
    return;
  const e = Vo(), n = /* @__PURE__ */ new Map(), t = [ar(e)];
  n.set(Qn(e), 0);
  let r = 0;
  for (; r < t.length; ) {
    const o = t[r++], i = Qn(o), s = n.get(i) + 1;
    for (const c of Lc) {
      const a = ar(Go(o, c)), u = Qn(a);
      n.has(u) || (n.set(u, s), t.push(a));
    }
  }
  if (n.size !== cs)
    throw new Error(
      `Incomplete Pyraminx distance table: reached ${n.size} of ${cs} edge states`
    );
  cr = n;
}
async function Al() {
  Ko();
}
function Xo(e) {
  qo(e), Ko();
  const n = cr.get(Qn(e));
  if (n === void 0)
    throw new Error("Pyraminx state is not reachable by face turns");
  return n;
}
function Rl(e) {
  qo(e), Ko();
  let n = ar(e), t = Xo(e);
  const r = [];
  for (; t > 0; ) {
    let o = !1;
    for (const i of Lc) {
      const s = ar(Go(n, i)), c = cr.get(Qn(s));
      if (c === t - 1) {
        r.push(i), n = s, t = c, o = !0;
        break;
      }
    }
    if (!o)
      throw new Error("Pyraminx solver could not find a shorter state");
  }
  return r.join(" ");
}
function Pl(e) {
  if (typeof e != "string")
    throw new TypeError("Solution must be a string");
  return e.trim() === "" ? "" : e.trim().split(/\s+/).reverse().map((n) => n.endsWith("'") ? n.slice(0, -1) : `${n}'`).join(" ");
}
const _l = 6, as = ["u", "l", "r", "b"];
function Cl(e, n) {
  return e.ep.every((t, r) => t === n.ep[r]) && e.eo.every((t, r) => t === n.eo[r]) && e.tips.every((t, r) => t === n.tips[r]);
}
function Ul(e) {
  return qo(e), Xo(e) >= _l;
}
function Il(e) {
  for (; ; ) {
    const n = Ml(e);
    if (Ul(n))
      return {
        state: n,
        distance: Xo(n)
      };
  }
}
function Fl(e, n) {
  const t = Mo(Vo(), e), r = [];
  for (let o = 0; o < 4; o++) {
    const i = (n.tips[o] - t.tips[o] + 3) % 3;
    i === 1 ? r.push(as[o]) : i === 2 && r.push(`${as[o]}'`);
  }
  return [e, ...r].filter(Boolean).join(" ");
}
async function Dl(e) {
  await Al();
  const { state: n } = Il(e), t = Rl(n), r = Pl(t), o = Fl(r, n), i = Mo(Vo(), o);
  if (!Cl(i, n))
    throw new Error(
      "Pyraminx scramble replay failed: generated state does not match target"
    );
  const s = Mo(
    { ...n, tips: [0, 0, 0, 0] },
    t
  );
  if (!s.ep.every((c, a) => c === a) || !s.eo.every((c) => c === 0))
    throw new Error("Pyraminx solution verification failed");
  return {
    event: "pyram",
    notation: o,
    moves: o.split(/\s+/),
    state: n
  };
}
const us = [-3, -1, 1, 3], ur = ["U", "R", "F", "D", "L", "B"], Nl = Object.freeze({
  U: [0, 1, 0],
  R: [1, 0, 0],
  F: [0, 0, 1],
  D: [0, -1, 0],
  L: [-1, 0, 0],
  B: [0, 0, -1]
});
function Ll(e, n) {
  return `${e.join(",")}|${n.join(",")}`;
}
function $l() {
  const e = [];
  for (const n of ur) {
    const t = Nl[n];
    for (const r of us)
      for (const o of us) {
        let i;
        switch (n) {
          case "U":
            i = [r, 3, o];
            break;
          case "R":
            i = [3, o, r];
            break;
          case "F":
            i = [r, o, 3];
            break;
          case "D":
            i = [r, -3, -o];
            break;
          case "L":
            i = [-3, o, -r];
            break;
          case "B":
            i = [-r, o, -3];
            break;
        }
        e.push(
          Object.freeze({
            position: Object.freeze(i),
            normal: Object.freeze([...t]),
            face: n,
            key: Ll(i, t)
          })
        );
      }
  }
  return Object.freeze(e);
}
const $e = $l(), kl = new Map(
  $e.map((e, n) => [e.key, n])
), Bl = $e.length;
function $c() {
  return $e.map((e) => e.face);
}
function kc(e) {
  if (!Array.isArray(e) || e.length !== Bl)
    return !1;
  const n = Object.fromEntries(
    ur.map((t) => [t, 0])
  );
  for (const t of e) {
    if (!Object.hasOwn(n, t))
      return !1;
    n[t]++;
  }
  return ur.every((t) => n[t] === 16);
}
function Bc(e) {
  if (!kc(e))
    throw new TypeError(
      "Invalid 4x4 facelet state: expected 96 stickers with exactly 16 stickers of each face colour"
    );
  return e;
}
function jl(e) {
  return kc(e) ? e.every(
    (n, t) => n === $e[t].face
  ) : !1;
}
const jc = Object.freeze({
  R: { axis: 0, layers: [3], direction: -1 },
  L: { axis: 0, layers: [-3], direction: 1 },
  U: { axis: 1, layers: [3], direction: -1 },
  D: { axis: 1, layers: [-3], direction: 1 },
  F: { axis: 2, layers: [3], direction: -1 },
  B: { axis: 2, layers: [-3], direction: 1 }
}), Vl = Object.keys(jc);
function ql(e) {
  if (typeof e != "string")
    throw new TypeError("Move must be a string");
  const n = e.match(
    /^(2[URFDLB]|[URFDLB]w|[urfdlb]|[URFDLB])([2']?)$/
  );
  if (!n)
    throw new RangeError(`Invalid 4x4 move "${e}"`);
  let [, t, r] = n;
  /^[urfdlb]$/.test(t) && (t = `${t.toUpperCase()}w`);
  let o, i;
  t.startsWith("2") ? (o = t[1], i = "inner") : t.endsWith("w") ? (o = t[0], i = "wide") : (o = t, i = "outer");
  const s = jc[o];
  let c = s.layers;
  i === "inner" ? c = [s.direction === 1 ? -1 : 1] : i === "wide" && (c = [
    s.layers[0],
    s.layers[0] - Math.sign(s.layers[0]) * 2
  ]);
  let a = r === "2" ? 2 : 1;
  return r === "'" && (a = -1), {
    axis: s.axis,
    layers: c,
    quarterTurns: s.direction * a,
    notation: t,
    suffix: r
  };
}
function fs(e, n, t) {
  const [r, o, i] = e;
  return n === 0 ? t === 1 ? [r, -i, o] : [r, i, -o] : n === 1 ? t === 1 ? [i, o, -r] : [-i, o, r] : t === 1 ? [-o, r, i] : [o, -r, i];
}
function Gl(e, n, t) {
  let r = [...e.position], o = [...e.normal];
  const i = Math.sign(t), s = Math.abs(t) % 4;
  for (let c = 0; c < s; c++)
    r = fs(r, n, i), o = fs(o, n, i);
  return { position: r, normal: o };
}
function Kl(e) {
  return ql(e);
}
const ls = /* @__PURE__ */ new Map();
function Xl(e) {
  const n = e, t = ls.get(n);
  if (t) return t;
  const { axis: r, layers: o, quarterTurns: i } = Kl(e), s = Array($e.length);
  for (let a = 0; a < $e.length; a++) {
    const u = $e[a], f = u.position[r];
    let l = u.key;
    if (o.includes(f)) {
      const p = Gl(u, r, i);
      l = `${p.position.join(",")}|${p.normal.join(",")}`;
    }
    const d = kl.get(l);
    if (d === void 0)
      throw new Error(
        `Internal move error: no destination for facelet ${u.key}`
      );
    s[a] = d;
  }
  const c = Object.freeze(s);
  return ls.set(n, c), c;
}
function Wl(e, n) {
  Bc(e);
  const t = Xl(n), r = Array(e.length);
  for (let o = 0; o < t.length; o++)
    r[t[o]] = e[o];
  return r;
}
function Yl(e, n) {
  const t = typeof n == "string" ? n.trim().split(/\s+/).filter(Boolean) : n;
  if (!Array.isArray(t))
    throw new TypeError("Moves must be an array or a space-separated string");
  return t.reduce(
    (r, o) => Wl(r, o),
    e
  );
}
Object.freeze(
  Vl.flatMap((e) => [
    e,
    `${e}'`,
    `${e}2`,
    `${e}w`,
    `${e}w'`,
    `${e}w2`,
    `2${e}`,
    `2${e}'`,
    `2${e}2`
  ])
);
function Hl(e, n) {
  return [e[0] + n[0], e[1] + n[1], e[2] + n[2]];
}
function ds(e) {
  return [-e[0], -e[1], -e[2]];
}
function zl(e) {
  return [e[0] / 2, e[1] / 2, e[2] / 2];
}
function Ao(e, n) {
  return e[0] * n[0] + e[1] * n[1] + e[2] * n[2];
}
function Jl(e, n) {
  return [
    e[1] * n[2] - e[2] * n[1],
    e[2] * n[0] - e[0] * n[2],
    e[0] * n[1] - e[1] * n[0]
  ];
}
function fn(e, n) {
  return e[0] === n[0] && e[1] === n[1] && e[2] === n[2];
}
function Ql(e, n) {
  return e[0] !== n[0] ? e[0] < n[0] : e[1] !== n[1] ? e[1] < n[1] : e[2] < n[2];
}
function tn(e) {
  return e.join(",");
}
function Ye(e, [n, t, r]) {
  switch (e) {
    case "U":
      return [-r, t, n];
    case "D":
      return [r, t, -n];
    case "F":
      return [t, -n, r];
    case "B":
      return [-t, n, r];
    case "R":
      return [n, r, -t];
    case "L":
      return [n, -r, t];
  }
}
var Vc = {
  U: { index: 1, sign: 1 },
  D: { index: 1, sign: -1 },
  F: { index: 2, sign: 1 },
  B: { index: 2, sign: -1 },
  R: { index: 0, sign: 1 },
  L: { index: 0, sign: -1 }
};
function rn(e, n, t) {
  const r = Ao(e, n), o = Jl(e, n), i = [
    (-n[0] + e[0] * r + t * o[0]) / 2,
    (-n[1] + e[1] * r + t * o[1]) / 2,
    (-n[2] + e[2] * r + t * o[2]) / 2
  ];
  if (!i.every(Number.isInteger))
    throw new Error(
      `vec3: rotating [${n.join(",")}] about [${e.join(",")}] left the integer lattice`
    );
  return i;
}
var Yt = [
  [1, 1, 1],
  // 0 URF
  [-1, 1, 1],
  // 1 UFL
  [-1, 1, -1],
  // 2 ULB
  [1, 1, -1],
  // 3 UBR
  [1, -1, 1],
  // 4 DFR
  [-1, -1, 1],
  // 5 DLF
  [-1, -1, -1],
  // 6 DBL
  [1, -1, -1]
  // 7 DRB
], Ht = [
  [1, 1, 0],
  // 0 UR
  [0, 1, 1],
  // 1 UF
  [-1, 1, 0],
  // 2 UL
  [0, 1, -1],
  // 3 UB
  [1, -1, 0],
  // 4 DR
  [0, -1, 1],
  // 5 DF
  [-1, -1, 0],
  // 6 DL
  [0, -1, -1],
  // 7 DB
  [1, 0, 1],
  // 8 FR
  [-1, 0, 1],
  // 9 FL
  [-1, 0, -1],
  // 10 BL
  [1, 0, -1]
  // 11 BR
], qc = {
  U: (e) => Ye("U", e),
  D: (e) => Ye("D", e),
  F: (e) => Ye("F", e),
  B: (e) => Ye("B", e),
  R: (e) => Ye("R", e),
  L: (e) => Ye("L", e)
}, Zl = {
  U: { axisIndex: 1, requiredValue: 1 },
  D: { axisIndex: 1, requiredValue: -1 },
  F: { axisIndex: 2, requiredValue: 1 },
  B: { axisIndex: 2, requiredValue: -1 },
  R: { axisIndex: 0, requiredValue: 1 },
  L: { axisIndex: 0, requiredValue: -1 }
};
function Gc(e, n) {
  const { axisIndex: t, requiredValue: r } = Zl[e];
  return n[t] === r;
}
function Kc(e, n) {
  const t = e.findIndex((r) => fn(r, n));
  if (t === -1)
    throw new Error(`geometry: no cube position matches vector [${n.join(",")}]`);
  return t;
}
function ps(e) {
  return e[0] * e[1] * e[2] === 1 ? ["Y", "X", "Z"] : ["Y", "Z", "X"];
}
function hs(e, n) {
  return n === "X" ? [e[0], 0, 0] : n === "Y" ? [0, e[1], 0] : [0, 0, e[2]];
}
function ed(e) {
  const n = qc[e], t = [], r = [];
  for (let o = 0; o < Yt.length; o += 1) {
    const i = Yt[o];
    if (!Gc(e, i)) {
      t[o] = o, r[o] = 0;
      continue;
    }
    const s = n(i), c = Kc(Yt, s);
    t[o] = c;
    const a = ps(i), u = ps(s), f = hs(i, a[0]), l = n(f);
    let d = null;
    for (let p = 0; p < 3; p += 1) {
      const v = hs(s, u[p]);
      if (fn(l, v)) {
        d = p;
        break;
      }
    }
    if (d === null)
      throw new Error(
        `geometry: ${e} produced an inconsistent corner orientation for position ${o}`
      );
    r[o] = d;
  }
  return { destination: t, twist: r };
}
function nd(e) {
  const n = qc[e], t = [], r = [], o = e === "F" || e === "B";
  for (let i = 0; i < Ht.length; i += 1) {
    const s = Ht[i];
    if (!Gc(e, s)) {
      t[i] = i, r[i] = 0;
      continue;
    }
    const c = n(s);
    t[i] = Kc(Ht, c), r[i] = o ? 1 : 0;
  }
  return { destination: t, flip: r };
}
function Xc(e) {
  const n = ed(e), t = nd(e);
  return {
    face: e,
    cornerDestination: n.destination,
    cornerTwist: n.twist,
    edgeDestination: t.destination,
    edgeFlip: t.flip
  };
}
var He = 8, xr = {
  cornerPermutation: [0, 1, 2, 3, 4, 5, 6, 7],
  cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0]
}, Wc = ["U", "R", "F"];
function td(e, n) {
  let t = Array.from({ length: He }, (o, i) => i), r = new Array(He).fill(0);
  for (let o = 0; o < n; o += 1) {
    const i = new Array(He), s = new Array(He);
    for (let c = 0; c < He; c += 1) {
      const a = t[c];
      i[c] = e.cornerDestination[a], s[c] = (r[c] + e.cornerTwist[a]) % 3;
    }
    t = i, r = s;
  }
  return { cornerDestination: t, cornerTwist: r };
}
function rd() {
  const e = /* @__PURE__ */ new Map();
  for (const n of Wc) {
    const t = Xc(n);
    for (const r of [1, 2, 3])
      e.set(`${n}${r}`, td(t, r));
  }
  return e;
}
var od = rd();
function id() {
  const e = [];
  for (const n of Wc)
    for (const t of [1, 2, 3]) e.push({ face: n, amount: t });
  return e;
}
function sd(e) {
  const n = od.get(`${e.face}${e.amount}`);
  if (!n)
    throw new Error(`state-222: ${e.face}${e.amount} is not a valid 2x2x2 move (only U/R/F)`);
  return n;
}
function cd(e, n) {
  const t = sd(n), r = new Array(He), o = new Array(He);
  for (let i = 0; i < He; i += 1) {
    const s = t.cornerDestination[i];
    r[s] = e.cornerPermutation[i], o[s] = (e.cornerOrientation[i] + t.cornerTwist[i]) % 3;
  }
  return { cornerPermutation: r, cornerOrientation: o };
}
var ad = 4294967296;
function we(e, n) {
  if (!Number.isInteger(n) || n <= 0)
    throw new Error(`randomInt: maxExclusive must be a positive integer, got ${n}`);
  const t = Math.floor(ad / n) * n;
  let r;
  do
    r = e.nextUint32();
  while (r >= t);
  return r % n;
}
var An = [0, 1, 2, 3, 4, 5, 7], Wo = An.length, Zn = Wo - 1;
function ud(e) {
  return e === 7 ? 6 : e;
}
function fd(e) {
  return e === 6 ? 7 : e;
}
function ld(e) {
  const n = Array.from({ length: e }, (o, i) => i), t = [];
  function r(o, i) {
    if (i.length === 0) {
      t.push(o);
      return;
    }
    for (let s = 0; s < i.length; s += 1) {
      const c = i[s];
      r([...o, c], [...i.slice(0, s), ...i.slice(s + 1)]);
    }
  }
  return r([], n), t;
}
var Yo = ld(Wo), Ho = Yo.length, dd = new Map(
  Yo.map((e, n) => [e.join(","), n])
);
function zo(e) {
  const t = An.map((o) => ud(e[o])).join(","), r = dd.get(t);
  if (r === void 0)
    throw new Error(`coordinates-222: "${t}" is not a valid permutation of the 7 movable corners`);
  return r;
}
function Yc(e) {
  const n = Yo[e];
  if (!n) throw new Error(`coordinates-222: cornerPerm222Coord ${e} out of range`);
  const t = new Array(8).fill(-1);
  return t[6] = 6, An.forEach((r, o) => {
    t[r] = fd(n[o]);
  }), t;
}
var Or = 3 ** Zn;
function Jo(e) {
  let n = 0;
  for (let t = 0; t < Zn; t += 1)
    n = n * 3 + e[An[t]];
  return n;
}
function Hc(e) {
  const n = new Array(8).fill(0);
  let t = e, r = 0;
  const o = new Array(Zn);
  for (let i = Zn - 1; i >= 0; i -= 1) {
    const s = t % 3;
    o[i] = s, r += s, t = (t - s) / 3;
  }
  for (let i = 0; i < Zn; i += 1)
    n[An[i]] = o[i];
  return n[An[Wo - 1]] = (3 - r % 3) % 3, n;
}
function zc(e) {
  return {
    cornerPerm: zo(e.cornerPermutation),
    cornerOrientation: Jo(e.cornerOrientation)
  };
}
var Jc = zo(xr.cornerPermutation), Qc = Jo(
  xr.cornerOrientation
);
function pd(e) {
  return e.cornerPerm === Jc && e.cornerOrientation === Qc;
}
function hd(e) {
  const n = we(e, Ho), t = we(e, Or);
  return {
    cornerPermutation: Yc(n),
    cornerOrientation: Hc(t)
  };
}
var ln = id(), md = ln.length;
function Zc(e, n, t) {
  const r = [];
  for (let o = 0; o < md; o += 1) {
    const i = new Array(e), s = ln[o];
    for (let c = 0; c < e; c += 1)
      i[c] = t(cd(n(c), s));
    r.push(i);
  }
  return r;
}
var gd = null, vd = null;
function ea() {
  return gd ?? (gd = Zc(
    Ho,
    (e) => ({ ...xr, cornerPermutation: Yc(e) }),
    (e) => zo(e.cornerPermutation)
  ));
}
function na() {
  return vd ?? (vd = Zc(
    Or,
    (e) => ({ ...xr, cornerOrientation: Hc(e) }),
    (e) => Jo(e.cornerOrientation)
  ));
}
var wd = new Map(
  ln.map((e, n) => [`${e.face}${e.amount}`, n])
);
function ta(e) {
  const n = wd.get(`${e.face}${e.amount}`);
  if (n === void 0)
    throw new Error(`tables-222: no move index for ${e.face}${e.amount}`);
  return n;
}
function ra(e, n) {
  return ea()[ta(n)][e];
}
function oa(e, n) {
  return na()[ta(n)][e];
}
function Sd() {
  ea(), na();
}
var ms = 255;
function Ed() {
  const e = Or, n = new Uint8Array(Ho * e).fill(ms), t = Jc * e + Qc;
  n[t] = 0;
  let r = [t], o = 0, i = 1;
  const s = n.length;
  for (; r.length > 0 && i < s; ) {
    const c = [];
    for (const a of r) {
      const u = Math.floor(a / e), f = a % e;
      for (const l of ln) {
        const d = ra(u, l), p = oa(f, l), v = d * e + p;
        n[v] === ms && (n[v] = o + 1, c.push(v), i += 1);
      }
    }
    r = c, o += 1;
  }
  return n;
}
var yd = null;
function ia() {
  return yd ?? (yd = Ed());
}
function sa(e, n) {
  return ia()[e * Or + n];
}
function bd() {
  ia();
}
function gs(e) {
  const n = zc(e);
  return sa(n.cornerPerm, n.cornerOrientation);
}
function xd(e, n, t = Od) {
  const r = zc(e);
  if (n === 0) return pd(r) ? [] : null;
  const o = [];
  return ca(r, 0, n, o, t) ? [...o] : null;
}
var Od = ln.map((e, n) => n);
function ca(e, n, t, r, o) {
  const i = sa(e.cornerPerm, e.cornerOrientation);
  if (n + i > t) return !1;
  if (n === t) return i === 0;
  const s = r[r.length - 1];
  for (const c of o) {
    const a = ln[c];
    if (s && s.face === a.face) continue;
    const u = {
      cornerPerm: ra(e.cornerPerm, a),
      cornerOrientation: oa(e.cornerOrientation, a)
    };
    if (r.push(a), ca(u, n + 1, t, r, o)) return !0;
    r.pop();
  }
  return !1;
}
var Re = ["U", "D", "F", "B", "L", "R"], Qo = [1, 2, 3], Td = {
  U: "UD",
  D: "UD",
  R: "RL",
  L: "RL",
  F: "FB",
  B: "FB"
};
function Tr(e) {
  return Td[e];
}
function Md(e) {
  return e.amount === 1 ? e.face : e.amount === 2 ? `${e.face}2` : `${e.face}'`;
}
function aa(e) {
  const n = /^([UDFBLR])(2|')?$/.exec(e);
  if (!n)
    throw new Error(`notation: "${e}" is not a valid face-move token`);
  const t = n[1], r = n[2];
  return { face: t, amount: r === "2" ? 2 : r === "'" ? 3 : 1 };
}
function Zo(e) {
  return e.map(Md).join(" ");
}
function Ad(e) {
  const n = 4 - e.amount;
  return { face: e.face, amount: n };
}
function ei(e) {
  return [...e].reverse().map(Ad);
}
var ni = /* @__PURE__ */ new Map();
function Te(e, n, t = "random-state", r) {
  ni.set(e, { scramble: n, quality: t, multiScramble: !1, prepare: r });
}
function Rd(e, n, t = "random-state", r) {
  ni.set(e, { scramble: n, quality: t, multiScramble: !0, prepare: r });
}
function ua(e) {
  return ni.get(e);
}
function ti(e, n, t, r) {
  return r(e) ? !1 : !n.some((o) => r(t(e, o)));
}
function wt(e, n, t, r) {
  for (; ; ) {
    const o = n(e);
    if (t(o) >= r) return o;
  }
}
function ri(e, n, t) {
  const r = Math.max(e, n), o = r + 8;
  for (let i = r; i <= o; i += 1) {
    const s = t(i);
    if (s) return s;
  }
  throw new Error(`solveAtLeastLength: no solution of length ${r}..${o} exists`);
}
function je(e, n) {
  const t = Array.from({ length: n }, (r, o) => o);
  for (let r = n - 1; r > 0; r -= 1) {
    const o = we(e, r + 1), i = t[r];
    t[r] = t[o], t[o] = i;
  }
  return t;
}
function Pd(e) {
  const n = [], t = [], r = new Array(e).fill(!1);
  function o() {
    if (t.length === e) {
      n.push([...t]);
      return;
    }
    for (let i = 0; i < e; i += 1)
      r[i] || (r[i] = !0, t.push(i), o(), t.pop(), r[i] = !1);
  }
  return o(), n;
}
function it(e) {
  const n = new Array(e.length).fill(!1);
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    if (n[r]) continue;
    let o = 0, i = r;
    for (; !n[i]; )
      n[i] = !0, i = e[i], o += 1;
    t += o - 1;
  }
  return t % 2;
}
function fa(e) {
  if (e.length < 2) return;
  const n = e[0];
  e[0] = e[1], e[1] = n;
}
var _d = 4, Cd = 11;
function Ud(e) {
  const n = wt(
    e,
    hd,
    gs,
    _d
  ), t = je(e, ln.length), r = ri(
    gs(n),
    Cd,
    (o) => xd(n, o, t)
  );
  return Zo(ei(r));
}
function Id() {
  Sd(), bd();
}
function Fd() {
  Te("222", (e) => Ud(e), "random-state", Id);
}
function Dd(e, n) {
  let t = [...e.cornerDestination], r = e.cornerDestination.map(() => 0), o = [...e.edgeDestination], i = e.edgeDestination.map(() => 0);
  for (let s = 0; s < e.cornerDestination.length; s += 1)
    t[s] = s;
  for (let s = 0; s < e.edgeDestination.length; s += 1)
    o[s] = s;
  for (let s = 0; s < n; s += 1) {
    const c = t.map(() => 0), a = r.map(() => 0);
    for (let l = 0; l < t.length; l += 1) {
      const d = t[l], p = e.cornerDestination[d];
      c[l] = p, a[l] = (r[l] + e.cornerTwist[d]) % 3;
    }
    t = c, r = a;
    const u = o.map(() => 0), f = i.map(() => 0);
    for (let l = 0; l < o.length; l += 1) {
      const d = o[l], p = e.edgeDestination[d];
      u[l] = p, f[l] = (i[l] + e.edgeFlip[d]) % 2;
    }
    o = u, i = f;
  }
  return {
    face: e.face,
    amount: n,
    cornerDestination: t,
    cornerTwist: r,
    edgeDestination: o,
    edgeFlip: i
  };
}
function Nd() {
  const e = /* @__PURE__ */ new Map();
  for (const n of Re) {
    const t = Xc(n);
    for (const r of Qo) {
      const o = Dd(t, r);
      e.set(We({ face: n, amount: r }), o);
    }
  }
  return e;
}
function We(e) {
  return `${e.face}${e.amount}`;
}
var Ld = Nd();
function $d(e) {
  const n = Ld.get(We(e));
  if (!n)
    throw new Error(`move-tables: no table for move ${We(e)}`);
  return n;
}
function la() {
  const e = [];
  for (const n of Re)
    for (const t of Qo) e.push({ face: n, amount: t });
  return e;
}
var ke = 8, Me = 12, Fe = {
  cornerPermutation: [0, 1, 2, 3, 4, 5, 6, 7],
  cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
  edgePermutation: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  edgeOrientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};
function kd(e, n) {
  const t = new Array(ke), r = new Array(ke), o = new Array(Me), i = new Array(Me);
  for (let s = 0; s < ke; s += 1) {
    const c = n.cornerDestination[s];
    t[c] = e.cornerPermutation[s], r[c] = (e.cornerOrientation[s] + n.cornerTwist[s]) % 3;
  }
  for (let s = 0; s < Me; s += 1) {
    const c = n.edgeDestination[s];
    o[c] = e.edgePermutation[s], i[c] = (e.edgeOrientation[s] + n.edgeFlip[s]) % 2;
  }
  return { cornerPermutation: t, cornerOrientation: r, edgePermutation: o, edgeOrientation: i };
}
function oi(e, n) {
  return kd(e, $d(n));
}
function da(e, n) {
  return n.reduce(oi, e);
}
function Bd(e) {
  const n = new Array(ke);
  let t = 0;
  for (let r = 0; r < ke - 1; r += 1) {
    const o = we(e, 3);
    n[r] = o, t += o;
  }
  return n[ke - 1] = (3 - t % 3) % 3, n;
}
function jd(e) {
  const n = new Array(Me);
  let t = 0;
  for (let r = 0; r < Me - 1; r += 1) {
    const o = we(e, 2);
    n[r] = o, t += o;
  }
  return n[Me - 1] = t % 2, n;
}
function pa(e) {
  const n = je(e, ke), t = je(e, Me);
  return it(n) !== it(t) && fa(t), {
    cornerPermutation: n,
    cornerOrientation: Bd(e),
    edgePermutation: t,
    edgeOrientation: jd(e)
  };
}
function ha(e) {
  if (!Number.isInteger(e) || e < 2)
    throw new Error(`nxn-notation: cube size must be an integer of at least 2, got ${e}`);
  return Math.floor(e / 2);
}
function ma(e) {
  const n = e.depth >= 3 ? String(e.depth) : "", t = e.depth >= 2 ? "w" : "", r = e.amount === 2 ? "2" : e.amount === 3 ? "'" : "";
  return `${n}${e.face}${t}${r}`;
}
function ga(e) {
  return e.map(ma).join(" ");
}
function Vd(e) {
  const n = /^(\d+)?([UDFBLR])(w)?(2|')?$/.exec(e);
  if (!n)
    throw new Error(`nxn-notation: "${e}" is not a valid wide-move token`);
  const t = n[1], r = n[3] === "w";
  if (t !== void 0 && !r)
    throw new Error(`nxn-notation: "${e}" has a layer count but no 'w'`);
  const o = t !== void 0 ? Number(t) : r ? 2 : 1;
  if (o < 2 && r)
    throw new Error(`nxn-notation: "${e}" is a wide move of depth ${o}`);
  const i = n[4];
  return {
    face: n[2],
    depth: o,
    amount: i === "2" ? 2 : i === "'" ? 3 : 1
  };
}
function qd(e) {
  return { ...e, amount: 4 - e.amount };
}
function Gd(e) {
  return [...e].reverse().map(qd);
}
function St(e) {
  const n = ha(e), t = [];
  for (const r of Re)
    for (let o = 1; o <= n; o += 1)
      for (const i of Qo) t.push({ face: r, depth: o, amount: i });
  return t;
}
function st(e) {
  return e.face === "R" || e.face === "L" ? "x" : e.face === "U" || e.face === "D" ? "y" : "z";
}
function cn(e) {
  return `${e.face}${e.depth}`;
}
var Kd = { R: "x", U: "y", F: "z" }, Xd = { x: "R", y: "U", z: "F" };
function Wd(e, n) {
  return e.depth >= n;
}
function Yd(e, n) {
  if (!Wd(e, n)) return ma(e);
  const t = Kd[e.face];
  if (t === void 0)
    throw new Error(
      `nxn-notation: a whole-cube rotation about ${e.face} has no WCA spelling — use R, U or F`
    );
  const r = e.amount === 2 ? "2" : e.amount === 3 ? "'" : "";
  return `${t}${r}`;
}
function Hd(e, n) {
  return e.map((t) => Yd(t, n)).join(" ");
}
function zd(e, n) {
  const t = /^([xyz])(2|')?$/.exec(e);
  if (!t) return Vd(e);
  const r = t[2];
  return {
    face: Xd[t[1]],
    depth: n,
    amount: r === "2" ? 2 : r === "'" ? 3 : 1
  };
}
var fr = {
  U: [0, 1, 0],
  D: [0, -1, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
  R: [1, 0, 0],
  L: [-1, 0, 0]
};
new Map(
  Object.keys(fr).map((e) => [tn(fr[e]), e])
);
function Jd(e) {
  return Array.from({ length: e }, (n, t) => 2 * t - e + 1);
}
function va(e) {
  ha(e);
  const n = Jd(e), t = [];
  for (const r of Object.keys(fr)) {
    const o = fr[r], { index: i } = Vc[r], s = [0, 1, 2].filter((c) => c !== i);
    for (const c of n)
      for (const a of n) {
        const u = [0, 0, 0];
        u[i] = o[i] * (e - 1), u[s[0]] = c, u[s[1]] = a;
        const f = [
          u[0] + o[0],
          u[1] + o[1],
          u[2] + o[2]
        ];
        t.push({ position: f, normal: o, face: r });
      }
  }
  return t;
}
function vs(e) {
  return `${tn(e.position)}|${tn(e.normal)}`;
}
function Qd(e, n, t, r) {
  const { index: o, sign: i } = Vc[n], s = e.position[o] - e.normal[o];
  return i * s >= r - 2 * t + 1;
}
function ii(e, n, t) {
  const r = new Map(e.map((i, s) => [vs(i), s])), o = new Array(e.length);
  for (let i = 0; i < e.length; i += 1) {
    const s = e[i];
    if (!Qd(s, n.face, n.depth, t)) {
      o[i] = i;
      continue;
    }
    let c = s.position, a = s.normal;
    for (let f = 0; f < n.amount; f += 1)
      c = Ye(n.face, c), a = Ye(n.face, a);
    const u = r.get(vs({ position: c, normal: a }));
    if (u === void 0)
      throw new Error(
        `nxn-geometry: ${n.face} carried a facelet off the cube (size ${t}, depth ${n.depth})`
      );
    o[i] = u;
  }
  return o;
}
function Zd(e) {
  return e % 2 === 0 ? e : Math.ceil(e / 2);
}
function wa(e) {
  const n = Zd(e), t = e % 2 === 0 ? ["R", "U", "F"] : Re, r = [];
  for (const o of t)
    for (const i of [1, 2, 3]) r.push({ face: o, depth: n, amount: i });
  return r;
}
function no(e) {
  const { facelets: n } = Et(e.size);
  if (e.size % 2 === 0) {
    if (!ya(e))
      throw new Error(
        `nxn-orientation: an even cube (${e.size}) has no fixed centres, so its orientation is only readable while every face is one colour`
      );
    const r = /* @__PURE__ */ new Map();
    for (let o = 0; o < e.occupant.length; o += 1)
      r.set(n[o].face, n[e.occupant[o]].face);
    return Re.map((o) => r.get(o)).join("");
  }
  const t = [];
  for (const r of Re) {
    const o = n.findIndex(
      (i) => i.face === r && i.position.every((s, c) => s === i.normal[c] * e.size || s === 0)
    );
    t.push(n[e.occupant[o]].face);
  }
  return t.join("");
}
var Hn = 24, to = /* @__PURE__ */ new Map();
function ep(e) {
  const n = e, t = [
    null,
    { face: "R", depth: n, amount: 1 },
    { face: "R", depth: n, amount: 2 },
    { face: "R", depth: n, amount: 3 },
    { face: "F", depth: n, amount: 1 },
    { face: "F", depth: n, amount: 3 }
  ], r = [
    null,
    { face: "U", depth: n, amount: 1 },
    { face: "U", depth: n, amount: 2 },
    { face: "U", depth: n, amount: 3 }
  ], o = [];
  for (const i of t)
    for (const s of r)
      o.push([i, s].filter((c) => c !== null));
  return o;
}
function np(e) {
  const n = to.get(e);
  if (n) return n;
  if (e % 2 === 0) {
    const c = ep(e), a = Ro(e), u = new Set(c.map((f) => no(Po(a, f))));
    if (u.size !== Hn)
      throw new Error(
        `nxn-orientation: the size-${e} vocabulary reaches ${u.size} orientations, expected ${Hn}`
      );
    return to.set(e, c), c;
  }
  const t = wa(e), r = /* @__PURE__ */ new Map(), o = Ro(e);
  r.set(no(o), []);
  let i = [[]];
  for (; i.length > 0 && r.size < Hn; ) {
    const c = [];
    for (const a of i)
      for (const u of t) {
        if (a.length > 0 && a[a.length - 1].face === u.face) continue;
        const f = [...a, u], l = no(Po(o, f));
        r.has(l) || (r.set(l, f), c.push(f));
      }
    i = c;
  }
  if (r.size !== Hn)
    throw new Error(
      `nxn-orientation: found ${r.size} orientations for size ${e}, expected ${Hn}`
    );
  const s = [...r.values()];
  return to.set(e, s), s;
}
function tp(e, n) {
  const t = np(n);
  return Hd(t[we(e, t.length)], n);
}
function si(e, n, t) {
  const r = tp(n, t);
  return r.length === 0 ? e : `${e} ${r}`;
}
var ws = /* @__PURE__ */ new Map();
function Et(e) {
  let n = ws.get(e);
  if (n) return n;
  const t = va(e), r = St(e), o = /* @__PURE__ */ new Map();
  for (const i of [...r, ...wa(e)]) {
    const s = Sa(i);
    o.has(s) || o.set(s, ii(t, i, e));
  }
  return n = { facelets: t, permutations: o, moves: r }, ws.set(e, n), n;
}
function Sa(e) {
  return `${cn(e)}.${e.amount}`;
}
function Ro(e) {
  const { facelets: n } = Et(e);
  return { size: e, occupant: n.map((t, r) => r) };
}
function Ea(e, n) {
  const { permutations: t } = Et(e.size), r = t.get(Sa(n));
  if (!r)
    throw new Error(
      `nxn-state: ${cn(n)} is not a legal move on a ${e.size}x${e.size}x${e.size}`
    );
  const o = new Array(e.occupant.length);
  for (let i = 0; i < r.length; i += 1)
    o[r[i]] = e.occupant[i];
  return { size: e.size, occupant: o };
}
function Po(e, n) {
  return n.reduce(Ea, e);
}
function ya(e) {
  const { facelets: n } = Et(e.size), t = /* @__PURE__ */ new Map();
  for (let r = 0; r < e.occupant.length; r += 1) {
    const o = n[r].face, i = n[e.occupant[r]].face, s = t.get(o);
    if (s === void 0) t.set(o, i);
    else if (s !== i) return !1;
  }
  return !0;
}
function rp(e, n) {
  const t = e.trim().split(/\s+/).filter((o) => o.length > 0).map((o) => zd(o, n)), r = Po(Ro(n), t);
  return ti(
    r,
    St(n),
    Ea,
    ya
  );
}
function Cn(e, n, t = 100) {
  for (let r = 0; r < t; r += 1) {
    const o = n();
    if (rp(o, e)) return o;
  }
  throw new Error(
    `nxn-minimum: ${t} scrambles of a ${e}x${e}x${e} in a row were within one move of solved`
  );
}
var ci = ke - 1, ai = Me - 1, ba = 3 ** ci, xa = 2 ** ai;
function Oa(e) {
  let n = 0;
  for (let t = 0; t < ci; t += 1)
    n = n * 3 + e[t];
  return n;
}
function op(e) {
  const n = new Array(ke).fill(0);
  let t = e, r = 0;
  for (let o = ci - 1; o >= 0; o -= 1) {
    const i = t % 3;
    n[o] = i, r += i, t = (t - i) / 3;
  }
  return n[ke - 1] = (3 - r % 3) % 3, n;
}
function Ta(e) {
  let n = 0;
  for (let t = 0; t < ai; t += 1)
    n = n * 2 + e[t];
  return n;
}
function ip(e) {
  const n = new Array(Me).fill(0);
  let t = e, r = 0;
  for (let o = ai - 1; o >= 0; o -= 1) {
    const i = t % 2;
    n[o] = i, r += i, t = (t - i) / 2;
  }
  return n[Me - 1] = r % 2, n;
}
var sp = /* @__PURE__ */ new Set([8, 9, 10, 11]);
function cp(e, n) {
  const t = [], r = [];
  function o(i) {
    if (r.length === n) {
      t.push([...r]);
      return;
    }
    for (let s = i; s < e; s += 1)
      r.push(s), o(s + 1), r.pop();
  }
  return o(0), t;
}
var ui = cp(Me, 4), Un = ui.length, ap = new Map(
  ui.map((e, n) => [e.join(","), n])
);
function fi(e) {
  const n = [];
  for (let o = 0; o < Me; o += 1)
    sp.has(e[o]) && n.push(o);
  const t = n.join(","), r = ap.get(t);
  if (r === void 0)
    throw new Error(`coordinates: "${t}" is not a valid 4-of-12 slice-edge combination`);
  return r;
}
function up(e) {
  const n = ui[e];
  if (!n)
    throw new Error(`coordinates: udSliceCoord ${e} is out of range [0, ${Un})`);
  return n;
}
function fp(e) {
  return {
    twist: Oa(e.cornerOrientation),
    flip: Ta(e.edgeOrientation),
    udSlice: fi(e.edgePermutation)
  };
}
var li = fi(Fe.edgePermutation);
function Ma(e) {
  return e.twist === 0 && e.flip === 0 && e.udSlice === li;
}
var yt = la(), lp = yt.length;
function dp(e) {
  return { ...Fe, cornerOrientation: op(e) };
}
function pp(e) {
  return { ...Fe, edgeOrientation: ip(e) };
}
function hp(e) {
  const n = new Array(Me).fill(-1), t = [8, 9, 10, 11];
  e.forEach((i, s) => {
    n[i] = t[s];
  });
  const r = Array.from({ length: Me }, (i, s) => s).filter(
    (i) => !e.includes(i)
  ), o = [0, 1, 2, 3, 4, 5, 6, 7];
  return r.forEach((i, s) => {
    n[i] = o[s];
  }), n;
}
function mp(e) {
  const n = up(e);
  return { ...Fe, edgePermutation: hp(n) };
}
function di(e, n, t) {
  const r = [];
  for (let o = 0; o < lp; o += 1) {
    const i = new Array(e), s = yt[o];
    for (let c = 0; c < e; c += 1) {
      const a = oi(n(c), s);
      i[c] = t(a);
    }
    r.push(i);
  }
  return r;
}
var gp = null, vp = null, wp = null;
function Aa() {
  return gp ?? (gp = di(
    ba,
    dp,
    (e) => Oa(e.cornerOrientation)
  ));
}
function Ra() {
  return vp ?? (vp = di(
    xa,
    pp,
    (e) => Ta(e.edgeOrientation)
  ));
}
function Pa() {
  return wp ?? (wp = di(
    Un,
    mp,
    (e) => fi(e.edgePermutation)
  ));
}
var Sp = new Map(yt.map((e, n) => [We(e), n]));
function pi(e) {
  const n = Sp.get(We(e));
  if (n === void 0)
    throw new Error(`phase1-tables: no move index for ${We(e)}`);
  return n;
}
function _a(e, n) {
  return Aa()[pi(n)][e];
}
function Ca(e, n) {
  return Ra()[pi(n)][e];
}
function hi(e, n) {
  return Pa()[pi(n)][e];
}
function Ep() {
  Aa(), Ra(), Pa();
}
var Ss = 255;
function Ua(e, n, t, r, o) {
  const i = new Uint8Array(e * n).fill(Ss), s = r * n + o;
  i[s] = 0;
  let c = [s], a = 0, u = 1;
  const f = e * n;
  for (; c.length > 0 && u < f; ) {
    const l = [];
    for (const d of c) {
      const p = Math.floor(d / n), v = d % n;
      for (const M of yt) {
        const [C, L] = t(p, v, M), R = C * n + L;
        i[R] === Ss && (i[R] = a + 1, l.push(R), u += 1);
      }
    }
    c = l, a += 1;
  }
  return i;
}
var yp = null, bp = null;
function Ia() {
  return yp ?? (yp = Ua(
    ba,
    Un,
    (e, n, t) => [_a(e, t), hi(n, t)],
    0,
    li
  ));
}
function Fa() {
  return bp ?? (bp = Ua(
    xa,
    Un,
    (e, n, t) => [Ca(e, t), hi(n, t)],
    0,
    li
  ));
}
function xp(e, n) {
  return Ia()[e * Un + n];
}
function Op(e, n) {
  return Fa()[e * Un + n];
}
function Da(e, n, t) {
  return Math.max(xp(e, t), Op(n, t));
}
function Tp() {
  Ia(), Fa();
}
var mi = {};
function Es(e, n) {
  const t = {};
  return e !== void 0 && (t.firstMoveAxis = e), n !== void 0 && (t.lastMoveAxis = n), t;
}
function Na(e, n) {
  return n.firstMoveAxis !== void 0 && Tr(e.face) === n.firstMoveAxis;
}
function gi(e, n) {
  return e === void 0 ? !1 : n.lastMoveAxis !== void 0 && Tr(e.face) === n.lastMoveAxis;
}
function Mp(e, n = mi) {
  const t = fp(e);
  if (Ma(t)) return [];
  let r = Da(t.twist, t.flip, t.udSlice);
  const o = [];
  for (; ; ) {
    const i = La(t, 0, r, o, n);
    if (i.found) return [...o];
    if (i.nextBound === 1 / 0)
      throw new Error("phase1Search: no path to G1 found — the input state may not be reachable");
    r = i.nextBound;
  }
}
function La(e, n, t, r, o) {
  const i = Da(e.twist, e.flip, e.udSlice), s = n + i;
  if (s > t) return { found: !1, nextBound: s };
  let c = 1 / 0;
  const a = r[r.length - 1];
  if (Ma(e) && !gi(a, o)) return { found: !0 };
  for (const u of yt) {
    if (a && a.face === u.face || n === 0 && Na(u, o)) continue;
    const f = {
      twist: _a(e.twist, u),
      flip: Ca(e.flip, u),
      udSlice: hi(e.udSlice, u)
    };
    r.push(u);
    const l = La(f, n + 1, t, r, o);
    if (l.found) return l;
    l.nextBound < c && (c = l.nextBound), r.pop();
  }
  return { found: !1, nextBound: c };
}
function $a(e) {
  const n = Array.from({ length: e }, (o, i) => i), t = [];
  function r(o, i) {
    if (i.length === 0) {
      t.push(o);
      return;
    }
    for (let s = 0; s < i.length; s += 1) {
      const c = i[s];
      r([...o, c], [...i.slice(0, s), ...i.slice(s + 1)]);
    }
  }
  return r([], n), t;
}
var Mr = $a(8), Ar = Mr.length, Ap = new Map(
  Mr.map((e, n) => [e.join(","), n])
), vi = $a(4), bt = vi.length, Rp = new Map(
  vi.map((e, n) => [e.join(","), n])
);
function ka(e) {
  const n = e.join(","), t = Ap.get(n);
  if (t === void 0)
    throw new Error(`phase2-coordinates: "${n}" is not a permutation of [0..7]`);
  return t;
}
function Pp(e) {
  const n = e.join(","), t = Rp.get(n);
  if (t === void 0)
    throw new Error(`phase2-coordinates: "${n}" is not a permutation of [0..3]`);
  return t;
}
function wi(e) {
  return ka(e);
}
function _p(e) {
  const n = Mr[e];
  if (!n) throw new Error(`phase2-coordinates: cornerPermCoord ${e} out of range`);
  return n;
}
function Si(e) {
  return ka(e.slice(0, 8));
}
function Cp(e) {
  const n = Mr[e];
  if (!n) throw new Error(`phase2-coordinates: edge8PermCoord ${e} out of range`);
  return n;
}
function Ei(e) {
  const n = e.slice(8, 12).map((t) => t - 8);
  return Pp(n);
}
function Up(e) {
  const n = vi[e];
  if (!n) throw new Error(`phase2-coordinates: udSliceOrderCoord ${e} out of range`);
  return n.map((t) => t + 8);
}
function Ip(e) {
  return {
    cornerPerm: wi(e.cornerPermutation),
    edge8Perm: Si(e.edgePermutation),
    udSliceOrder: Ei(e.edgePermutation)
  };
}
var Ba = wi(Fe.cornerPermutation), ja = Si(Fe.edgePermutation), yi = Ei(Fe.edgePermutation);
function Va(e) {
  return e.cornerPerm === Ba && e.edge8Perm === ja && e.udSliceOrder === yi;
}
var xt = [
  { face: "U", amount: 1 },
  { face: "U", amount: 2 },
  { face: "U", amount: 3 },
  { face: "D", amount: 1 },
  { face: "D", amount: 2 },
  { face: "D", amount: 3 },
  { face: "L", amount: 2 },
  { face: "R", amount: 2 },
  { face: "F", amount: 2 },
  { face: "B", amount: 2 }
], Fp = xt.length;
function Dp(e) {
  return { ...Fe, cornerPermutation: _p(e) };
}
function Np(e) {
  const n = Cp(e);
  return { ...Fe, edgePermutation: [...n, 8, 9, 10, 11] };
}
function Lp(e) {
  const n = Up(e);
  return { ...Fe, edgePermutation: [0, 1, 2, 3, 4, 5, 6, 7, ...n] };
}
function bi(e, n, t) {
  const r = [];
  for (let o = 0; o < Fp; o += 1) {
    const i = new Array(e), s = xt[o];
    for (let c = 0; c < e; c += 1)
      i[c] = t(oi(n(c), s));
    r.push(i);
  }
  return r;
}
var $p = null, kp = null, Bp = null;
function qa() {
  return $p ?? ($p = bi(
    Ar,
    Dp,
    (e) => wi(e.cornerPermutation)
  ));
}
function Ga() {
  return kp ?? (kp = bi(
    Ar,
    Np,
    (e) => Si(e.edgePermutation)
  ));
}
function Ka() {
  return Bp ?? (Bp = bi(
    bt,
    Lp,
    (e) => Ei(e.edgePermutation)
  ));
}
var jp = new Map(
  xt.map((e, n) => [We(e), n])
);
function xi(e) {
  const n = jp.get(We(e));
  if (n === void 0)
    throw new Error(`phase2-tables: ${We(e)} is not a phase-2 (G1-preserving) move`);
  return n;
}
function Xa(e, n) {
  return qa()[xi(n)][e];
}
function Wa(e, n) {
  return Ga()[xi(n)][e];
}
function Oi(e, n) {
  return Ka()[xi(n)][e];
}
function Vp() {
  qa(), Ga(), Ka();
}
var ys = 255;
function Ya(e, n, t, r, o) {
  const i = new Uint8Array(e * n).fill(ys), s = r * n + o;
  i[s] = 0;
  let c = [s], a = 0, u = 1;
  const f = e * n;
  for (; c.length > 0 && u < f; ) {
    const l = [];
    for (const d of c) {
      const p = Math.floor(d / n), v = d % n;
      for (const M of xt) {
        const [C, L] = t(p, v, M), R = C * n + L;
        i[R] === ys && (i[R] = a + 1, l.push(R), u += 1);
      }
    }
    c = l, a += 1;
  }
  return i;
}
var qp = null, Gp = null;
function Ha() {
  return qp ?? (qp = Ya(
    Ar,
    bt,
    (e, n, t) => [
      Xa(e, t),
      Oi(n, t)
    ],
    Ba,
    yi
  ));
}
function za() {
  return Gp ?? (Gp = Ya(
    Ar,
    bt,
    (e, n, t) => [
      Wa(e, t),
      Oi(n, t)
    ],
    ja,
    yi
  ));
}
function Kp(e, n) {
  return Ha()[e * bt + n];
}
function Xp(e, n) {
  return za()[e * bt + n];
}
function Ja(e, n, t) {
  return Math.max(
    Kp(e, t),
    Xp(n, t)
  );
}
function Wp() {
  Ha(), za();
}
function Yp(e, n = mi) {
  const t = Ip(e);
  if (Va(t)) return [];
  let r = Ja(t.cornerPerm, t.edge8Perm, t.udSliceOrder);
  const o = [];
  for (; ; ) {
    const i = Qa(t, 0, r, o, n);
    if (i.found) return [...o];
    if (i.nextBound === 1 / 0)
      throw new Error("phase2Search: no path to solved found — the input state may not be in G1");
    r = i.nextBound;
  }
}
function Qa(e, n, t, r, o) {
  const i = Ja(e.cornerPerm, e.edge8Perm, e.udSliceOrder), s = n + i;
  if (s > t) return { found: !1, nextBound: s };
  let c = 1 / 0;
  const a = r[r.length - 1];
  if (Va(e) && !gi(a, o)) return { found: !0 };
  for (const u of xt) {
    if (a && a.face === u.face || n === 0 && Na(u, o)) continue;
    const f = {
      cornerPerm: Xa(e.cornerPerm, u),
      edge8Perm: Wa(e.edge8Perm, u),
      udSliceOrder: Oi(e.udSliceOrder, u)
    };
    r.push(u);
    const l = Qa(f, n + 1, t, r, o);
    if (l.found) return l;
    l.nextBound < c && (c = l.nextBound), r.pop();
  }
  return { found: !1, nextBound: c };
}
function Ti(e, n = mi) {
  const t = bs(e, n, !1);
  return gi(t[t.length - 1], n) ? bs(e, n, !0) : t;
}
function bs(e, n, t) {
  const r = Mp(
    e,
    Es(
      n.firstMoveAxis,
      t ? n.lastMoveAxis : void 0
    )
  ), o = da(e, r), i = Yp(
    o,
    Es(
      r.length === 0 ? n.firstMoveAxis : void 0,
      n.lastMoveAxis
    )
  );
  return [...r, ...i];
}
function Za(e) {
  const n = pa(e), t = Ti(n);
  return Zo(ei(t));
}
var ct = 3;
function eu(e) {
  return Cn(ct, () => Za(e));
}
function Hp() {
  Te(
    "333",
    (e) => eu(e),
    "random-state",
    Rr
  );
}
function Rr() {
  Ep(), Tp(), Vp(), Wp();
}
var nu = "R' U' F", tu = "R' U' F", xs = nu.split(" ").map(aa), zp = tu.split(" ").map(aa), Jp = Tr(xs[xs.length - 1].face), Qp = Tr(zp[0].face), Zp = {
  firstMoveAxis: Qp,
  lastMoveAxis: Jp
};
function e0(e) {
  const n = pa(e), t = Zo(ei(Ti(n, Zp)));
  return [nu, t, tu].filter((r) => r !== "").join(" ");
}
function n0(e) {
  return Cn(ct, () => e0(e));
}
function t0() {
  Te(
    "333fm",
    (e) => n0(e),
    "random-state",
    Rr
  );
}
var Pr = ["UR", "DR", "DL", "UL"], r0 = [
  "UR",
  "DR",
  "DL",
  "UL",
  "U",
  "R",
  "D",
  "L",
  "ALL"
], o0 = {
  UR: ["UR"],
  DR: ["DR"],
  DL: ["DL"],
  UL: ["UL"],
  U: ["UL", "UR"],
  R: ["UR", "DR"],
  D: ["DL", "DR"],
  L: ["UL", "DL"],
  ALL: ["UL", "UR", "DL", "DR"]
}, Ne = 12;
function i0(e) {
  const n = (e % Ne + Ne) % Ne;
  return n <= 6 ? `${n}+` : `${Ne - n}-`;
}
function s0(e) {
  return e.kind === "flip" ? "y2" : e.kind === "pins" ? e.up.join(" ") : `${e.pins}${i0(e.amount)}`;
}
function c0(e) {
  return e.map(s0).filter((n) => n.length > 0).join(" ");
}
new Set(r0);
var zt = 9, at = {
  UL: 0,
  UR: 2,
  DL: 6,
  DR: 8
}, a0 = [0, 2, 6, 8], Mi = [1, 3, 4, 5, 7], lr = [2, 1, 0, 5, 4, 3, 8, 7, 6], u0 = (() => {
  const e = (n) => {
    const t = at[n], r = Math.floor(t / 3), o = t % 3, i = [];
    for (let s = 0; s < 3; s += 1)
      for (let c = 0; c < 3; c += 1) {
        const a = s * 3 + c;
        a !== t && Math.abs(s - r) <= 1 && Math.abs(c - o) <= 1 && i.push(a);
      }
    return i;
  };
  return { UL: e("UL"), UR: e("UR"), DL: e("DL"), DR: e("DR") };
})();
function f0(e) {
  const n = /* @__PURE__ */ new Set();
  for (const t of e) {
    n.add(at[t]);
    for (const r of u0[t]) n.add(r);
  }
  return [...n].sort((t, r) => t - r);
}
function on(e) {
  return (e % Ne + Ne) % Ne;
}
var _o = {
  front: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  back: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  pinsUp: { UR: !1, DR: !1, DL: !1, UL: !1 }
};
function ru(e, n, t, r) {
  const o = [...r ? e.back : e.front], i = [...r ? e.front : e.back];
  for (const s of f0(n))
    o[s] = on(o[s] + t);
  for (const s of n) {
    const c = at[s];
    i[lr[c]] = on(i[lr[c]] - t);
  }
  return {
    front: r ? i : o,
    back: r ? o : i,
    pinsUp: l0(e.pinsUp, n, r)
  };
}
function Os(e, n, t, r) {
  return ru(e, o0[n], t, r);
}
function l0(e, n, t) {
  const r = new Set(t ? n.map(d0) : n), o = { ...e };
  for (const i of Pr)
    o[i] = t ? !r.has(i) : r.has(i);
  return o;
}
function d0(e) {
  const n = lr[at[e]], t = Pr.find((r) => at[r] === n);
  if (!t) throw new Error(`clock-state: no corner mirrors ${e}`);
  return t;
}
function p0(e) {
  return e.front.every((n) => n === 0) && e.back.every((n) => n === 0);
}
var dr = zt + Mi.length;
function Co(e) {
  return [...e.front, ...Mi.map((n) => e.back[n])];
}
function ou(e, n = _o.pinsUp) {
  if (e.length !== dr)
    throw new Error(`clock-state: expected ${dr} dial values, got ${e.length}`);
  const t = e.slice(0, zt).map(on), r = new Array(zt).fill(0);
  Mi.forEach((o, i) => {
    r[o] = on(e[zt + i]);
  });
  for (const o of a0)
    r[lr[o]] = on(-t[o]);
  return { front: t, back: r, pinsUp: n };
}
function vn(e, n) {
  return (e % n + n) % n;
}
function h0(e, n) {
  let [t, r] = [e, n], [o, i] = [1, 0];
  for (; r !== 0; ) {
    const s = Math.floor(t / r);
    [t, r] = [r, t - s * r], [o, i] = [i, o - s * i];
  }
  return { g: t, x: o };
}
function m0(e, n) {
  const t = vn(e, n), { g: r, x: o } = h0(t, n);
  return r !== 1 ? null : vn(o, n);
}
function Ts(e, n) {
  const t = e.length, r = e.map((i) => i.map((s) => vn(s, n))), o = Array.from(
    { length: t },
    (i, s) => Array.from({ length: t }, (c, a) => s === a ? 1 : 0)
  );
  for (let i = 0; i < t; i += 1) {
    let s = -1, c = 0;
    for (let a = i; a < t; a += 1) {
      const u = m0(r[a][i], n);
      if (u !== null) {
        s = a, c = u;
        break;
      }
    }
    if (s === -1)
      throw new Error(`mod-matrix: matrix is singular modulo ${n} at column ${i}`);
    [r[i], r[s]] = [r[s], r[i]], [o[i], o[s]] = [o[s], o[i]];
    for (let a = 0; a < t; a += 1)
      r[i][a] = r[i][a] * c % n, o[i][a] = o[i][a] * c % n;
    for (let a = 0; a < t; a += 1) {
      if (a === i) continue;
      const u = r[a][i];
      if (u !== 0)
        for (let f = 0; f < t; f += 1)
          r[a][f] = vn(r[a][f] - u * r[i][f], n), o[a][f] = vn(o[a][f] - u * o[i][f], n);
    }
  }
  return o;
}
function g0(e) {
  const n = Ts(e, 4), t = Ts(e, 3);
  return n.map(
    (r, o) => r.map((i, s) => (9 * i + 4 * t[o][s]) % 12)
  );
}
function v0(e, n, t) {
  return e.map((r) => {
    let o = 0;
    for (let i = 0; i < r.length; i += 1) o += r[i] * n[i];
    return vn(o, t);
  });
}
function w0(e) {
  const n = e.length, t = e.map((s) => [...s]);
  let r = 1, o = 1;
  for (let s = 0; s < n - 1; s += 1) {
    if (t[s][s] === 0) {
      const c = t.findIndex((a, u) => u > s && a[s] !== 0);
      if (c === -1) return 0;
      [t[s], t[c]] = [t[c], t[s]], r = -r;
    }
    for (let c = s + 1; c < n; c += 1)
      for (let a = s + 1; a < n; a += 1)
        t[c][a] = (t[c][a] * t[s][s] - t[c][s] * t[s][a]) / o;
    o = t[s][s];
  }
  const i = r * t[n - 1][n - 1];
  return i === 0 ? 0 : i;
}
var pr = [
  "UR",
  "DR",
  "DL",
  "UL",
  "U",
  "R",
  "D",
  "L",
  "ALL"
], Ai = ["U", "R", "D", "L", "ALL"], Ms = pr.length + Ai.length, iu = [
  ...pr.map((e) => Co(Os(_o, e, 1, !1))),
  ...Ai.map((e) => Co(Os(_o, e, 1, !0)))
];
w0(iu);
var S0 = null;
function E0() {
  return S0 ?? (S0 = g0(iu));
}
function y0(e) {
  const n = b0(E0());
  return v0(n, Co(e), Ne);
}
function b0(e) {
  return e[0].map((n, t) => e.map((r) => r[t]));
}
function x0(e) {
  if (e.length !== Ms)
    throw new Error(`clock-template: expected ${Ms} amounts, got ${e.length}`);
  const n = pr.map((t, r) => ({
    kind: "dial",
    pins: t,
    amount: on(e[r])
  }));
  return n.push({ kind: "flip" }), Ai.forEach((t, r) => {
    n.push({
      kind: "dial",
      pins: t,
      amount: on(e[pr.length + r])
    });
  }), n;
}
function O0(e) {
  const n = Array.from({ length: dr }, () => we(e, Ne)), t = {};
  for (const r of Pr) t[r] = we(e, 2) === 1;
  return ou(n, t);
}
function T0() {
  const e = /* @__PURE__ */ new Set(), n = Pr, t = ou(new Array(dr).fill(0));
  for (let r = 1; r < 1 << n.length; r += 1) {
    const o = n.filter((i, s) => (r & 1 << s) !== 0);
    for (const i of [!1, !0])
      for (let s = 1; s < Ne; s += 1)
        e.add(su(ru(t, o, s, i)));
  }
  return e;
}
function su(e) {
  return `${e.front.join(",")}|${e.back.join(",")}`;
}
var As = null;
function M0(e) {
  return p0(e) ? 0 : (As ?? (As = T0()), As.has(su(e)) ? 1 : 2);
}
var A0 = 2;
function R0(e) {
  return x0(y0(e));
}
function P0(e) {
  const n = wt(
    e,
    O0,
    M0,
    A0
  );
  return c0(R0(n));
}
function _0() {
  Te("clock", (e) => P0(e));
}
var C0 = ["U", "R", "D"];
function U0(e) {
  return e.kind === "U" ? e.direction === 1 ? "U" : "U'" : e.direction === 1 ? `${e.kind}++` : `${e.kind}--`;
}
function I0(e) {
  return e.map(U0).join(" ");
}
function F0() {
  return C0.flatMap(
    (e) => [1, 2].map((n) => ({ kind: e, direction: n }))
  );
}
var Ri = (1 + Math.sqrt(5)) / 2, cu = Ri - 1, Je = 1e-6;
function In(e, n) {
  return e[0] * n[0] + e[1] * n[1] + e[2] * n[2];
}
function D0(e, n) {
  return [e[1] * n[2] - e[2] * n[1], e[2] * n[0] - e[0] * n[2], e[0] * n[1] - e[1] * n[0]];
}
function et(e, n) {
  return [e[0] * n, e[1] * n, e[2] * n];
}
function Uo(e, n) {
  return [e[0] + n[0], e[1] + n[1], e[2] + n[2]];
}
function au(e) {
  return Math.sqrt(In(e, e));
}
function N0(e) {
  return et(e, 1 / au(e));
}
function hr(e, n) {
  return au([e[0] - n[0], e[1] - n[1], e[2] - n[2]]);
}
function an(e) {
  return e.map((n) => (Math.abs(n) < Je ? 0 : n).toFixed(9)).join(",");
}
function Io(e) {
  const n = [], t = /* @__PURE__ */ new Set();
  for (let r = 0; r < 3; r += 1) {
    const o = [
      e[r % 3],
      e[(r + 1) % 3],
      e[(r + 2) % 3]
    ];
    for (const i of [1, -1])
      for (const s of [1, -1])
        for (const c of [1, -1]) {
          const a = [o[0] * i, o[1] * s, o[2] * c], u = an(a);
          t.has(u) || (t.add(u), n.push(a));
        }
  }
  return n;
}
function Fn(e) {
  return [...e].sort((n, t) => an(n) < an(t) ? -1 : 1);
}
var Qe = Fn(Io([0, Ri, 1])), Ke = Fn([
  ...Io([1, 1, 1]),
  ...Io([0, cu, Ri])
]), L0 = 2 * cu, Rn = (() => {
  const e = [], n = /* @__PURE__ */ new Set();
  for (let t = 0; t < Ke.length; t += 1)
    for (let r = t + 1; r < Ke.length; r += 1) {
      const o = Ke[t], i = Ke[r];
      if (Math.abs(hr(o, i) - L0) > Je) continue;
      const s = et(Uo(o, i), 0.5), c = an(s);
      n.has(c) || (n.add(c), e.push(s));
    }
  return Fn(e);
})(), mr = Qe.length, wn = Ke.length, Sn = Rn.length;
function nn(e, n, t) {
  const r = N0(e), o = t * 2 * Math.PI / 5, i = Math.cos(o), s = Math.sin(o);
  return Uo(
    Uo(et(n, i), et(D0(r, n), s)),
    et(r, In(r, n) * (1 - i))
  );
}
function ro(e, n) {
  let t = -1, r = 1 / 0;
  for (let o = 0; o < e.length; o += 1) {
    const i = hr(e[o], n);
    i < r && (r = i, t = o);
  }
  if (r > Je)
    throw new Error(
      `megaminx-geometry: [${n.join(",")}] is ${r} from the nearest position — not a lattice point`
    );
  return t;
}
function oo(e, n) {
  return Math.max(...e.map((t) => In(t, n)));
}
var Rs = /* @__PURE__ */ new Map();
function Pi(e) {
  const n = an(e);
  let t = Rs.get(n);
  return t || (t = {
    corners: oo(Ke, e),
    edges: oo(Rn, e),
    centers: oo(Qe, e)
  }, Rs.set(n, t)), t;
}
function uu(e, n) {
  return Math.abs(In(n, e) - Pi(e).corners) < Je;
}
function gr(e, n) {
  return Math.abs(In(n, e) - Pi(e).edges) < Je;
}
function $0(e, n) {
  return Math.abs(In(n, e) - Pi(e).centers) < Je;
}
function k0(e) {
  return Qe.filter((n) => uu(n, e));
}
function B0(e) {
  return Qe.filter((n) => gr(n, e));
}
function j0(e) {
  const n = k0(e);
  if (n.length !== 3)
    throw new Error(`megaminx-geometry: corner [${e.join(",")}] touches ${n.length} faces, expected 3`);
  const t = Fn(n)[0], r = nn(e, t, 5 / 3), o = nn(e, r, 5 / 3);
  return [t, r, o];
}
function V0(e) {
  const n = B0(e);
  if (n.length !== 2)
    throw new Error(`megaminx-geometry: edge [${e.join(",")}] touches ${n.length} faces, expected 2`);
  return Fn(n)[0];
}
var Ps = Ke.map(j0), _s = Rn.map(V0);
function hn(e, n, t) {
  const r = (u) => t === "on-layer" ? u : !u, o = [], i = [];
  for (let u = 0; u < wn; u += 1) {
    const f = Ke[u];
    if (!r(uu(e, f))) {
      o[u] = u, i[u] = 0;
      continue;
    }
    const l = nn(e, f, n), d = ro(Ke, l);
    o[u] = d;
    const p = nn(e, Ps[u][0], n), M = Ps[d].findIndex((C) => hr(C, p) < Je);
    if (M === -1)
      throw new Error(`megaminx-geometry: corner ${u} lost track of its reference sticker`);
    i[u] = M;
  }
  const s = [], c = [];
  for (let u = 0; u < Sn; u += 1) {
    const f = Rn[u];
    if (!r(gr(e, f))) {
      s[u] = u, c[u] = 0;
      continue;
    }
    const l = nn(e, f, n), d = ro(Rn, l);
    s[u] = d;
    const p = nn(e, _s[u], n);
    c[u] = hr(p, _s[d]) < Je ? 0 : 1;
  }
  const a = [];
  for (let u = 0; u < mr; u += 1) {
    const f = Qe[u];
    a[u] = r($0(e, f)) ? ro(Qe, nn(e, f, n)) : u;
  }
  return { cornerDestination: o, cornerTwist: i, edgeDestination: s, edgeFlip: c, centerDestination: a };
}
var gn = Qe[0], Cs = (() => {
  const e = Qe.filter(
    (n) => an(n) !== an(gn) && q0(gn, n)
  );
  return Fn(e)[0];
})();
function q0(e, n) {
  return Rn.some((t) => gr(e, t) && gr(n, t));
}
var io = (e) => Array.from({ length: e }, (n, t) => t), Us = (e) => new Array(e).fill(0), G0 = {
  cornerPermutation: io(wn),
  cornerOrientation: Us(wn),
  edgePermutation: io(Sn),
  edgeOrientation: Us(Sn),
  centerPermutation: io(mr)
}, K0 = (() => {
  const e = /* @__PURE__ */ new Map();
  return e.set("U1", hn(gn, -1, "on-layer")), e.set("U2", hn(gn, 1, "on-layer")), e.set("D1", hn(gn, 2, "off-layer")), e.set("D2", hn(gn, -2, "off-layer")), e.set("R1", hn(Cs, 2, "off-layer")), e.set("R2", hn(Cs, -2, "off-layer")), e;
})();
function X0(e) {
  const n = K0.get(`${e.kind}${e.direction}`);
  if (!n) throw new Error(`megaminx-state: no move table for ${e.kind}${e.direction}`);
  return n;
}
function fu(e, n) {
  const t = X0(n), r = new Array(wn), o = new Array(wn);
  for (let a = 0; a < wn; a += 1) {
    const u = t.cornerDestination[a];
    r[u] = e.cornerPermutation[a], o[u] = (e.cornerOrientation[a] + t.cornerTwist[a]) % 3;
  }
  const i = new Array(Sn), s = new Array(Sn);
  for (let a = 0; a < Sn; a += 1) {
    const u = t.edgeDestination[a];
    i[u] = e.edgePermutation[a], s[u] = (e.edgeOrientation[a] + t.edgeFlip[a]) % 2;
  }
  const c = new Array(mr);
  for (let a = 0; a < mr; a += 1)
    c[t.centerDestination[a]] = e.centerPermutation[a];
  return {
    cornerPermutation: r,
    cornerOrientation: o,
    edgePermutation: i,
    edgeOrientation: s,
    centerPermutation: c
  };
}
function W0(e, n) {
  return n.reduce(fu, e);
}
function so(e) {
  return e.every((n, t) => n === t);
}
function Y0(e) {
  return so(e.cornerPermutation) && so(e.edgePermutation) && so(e.centerPermutation) && e.cornerOrientation.every((n) => n === 0) && e.edgeOrientation.every((n) => n === 0);
}
var H0 = 7, z0 = 10;
function Is(e) {
  return we(e, 2) + 1;
}
function J0(e) {
  const n = [];
  for (let t = 0; t < H0; t += 1) {
    for (let r = 0; r < z0; r += 1)
      n.push({ kind: r % 2 === 0 ? "R" : "D", direction: Is(e) });
    n.push({ kind: "U", direction: Is(e) });
  }
  return n;
}
function Q0(e) {
  return ti(
    W0(G0, e),
    F0(),
    fu,
    Y0
  );
}
var Fs = 100;
function Z0(e) {
  for (let n = 0; n < Fs; n += 1) {
    const t = J0(e);
    if (Q0(t)) return I0(t);
  }
  throw new Error(
    `megaminx: ${Fs} scrambles in a row were within one move of solved`
  );
}
function eh() {
  Te("minx", (e) => Z0(e), "random-moves");
}
function nh(e, n) {
  const t = st(n), r = cn(n);
  for (let o = e.length - 1; o >= 0; o -= 1) {
    const i = e[o];
    if (st(i) !== t) return !1;
    if (cn(i) === r) return !0;
  }
  return !1;
}
function th(e, n, t) {
  const r = St(n), o = [];
  for (; o.length < t; ) {
    const i = r[we(e, r.length)];
    nh(o, i) || o.push(i);
  }
  return o;
}
var lu = [
  { event: "555", size: 5, length: 60 },
  { event: "666", size: 6, length: 80 },
  { event: "777", size: 7, length: 100 }
];
function du(e, n, t) {
  return Cn(
    n,
    () => ga(th(e, n, t))
  );
}
function rh() {
  for (const { event: e, size: n, length: t } of lu)
    Te(
      e,
      (r) => du(r, n, t),
      "random-moves",
      () => _r(n)
    );
}
function _r(e) {
  Et(e);
}
var Ue = ["U", "L", "R", "B"], oh = [1, 2];
function ih(e) {
  const n = e.tip ? e.vertex.toLowerCase() : e.vertex;
  return e.amount === 2 ? `${n}'` : n;
}
function sh(e) {
  return e.map(ih).join(" ");
}
function ch(e) {
  return { ...e, amount: 3 - e.amount };
}
function ah(e) {
  return [...e].reverse().map(ch);
}
function uh() {
  const e = [];
  for (const n of Ue)
    for (const t of oh) e.push({ vertex: n, amount: t, tip: !1 });
  return e;
}
var ut = {
  U: [1, 1, 1],
  L: [-1, 1, -1],
  R: [-1, -1, 1],
  B: [1, -1, -1]
}, Ot = (() => {
  const e = [];
  for (let n = 0; n < Ue.length; n += 1)
    for (let t = n + 1; t < Ue.length; t += 1)
      e.push([Ue[n], Ue[t]]);
  return e;
})(), Se = Ot.length, un = Ue.length;
Ot.map(([e, n]) => `${e}${n}`);
var _i = Ot.map(
  ([e, n]) => zl(Hl(ut[e], ut[n]))
);
function fh(e) {
  const n = _i.findIndex((t) => fn(t, e));
  if (n === -1)
    throw new Error(`pyraminx-geometry: no edge slot at [${e.join(",")}]`);
  return n;
}
function lh(e) {
  const [n, t] = Ot[e], r = Ue.filter((o) => o !== n && o !== t);
  return [ds(ut[r[0]]), ds(ut[r[1]])];
}
function dh(e) {
  const [n, t] = lh(e);
  return Ql(n, t) ? n : t;
}
var Ds = _i.map((e, n) => dh(n));
function ph(e) {
  const n = ut[e], t = [], r = [];
  for (let i = 0; i < Se; i += 1) {
    const [s, c] = Ot[i];
    if (s !== e && c !== e) {
      t[i] = i, r[i] = 0;
      continue;
    }
    const a = fh(rn(n, _i[i], -1));
    t[i] = a;
    const u = rn(n, Ds[i], -1);
    r[i] = fn(u, Ds[a]) ? 0 : 1;
  }
  const o = Ue.map((i) => i === e ? 1 : 0);
  return { vertex: e, edgeDestination: t, edgeFlip: r, axialTwist: o };
}
var Cr = {
  edgePermutation: [0, 1, 2, 3, 4, 5],
  edgeOrientation: [0, 0, 0, 0, 0, 0],
  axialOrientation: [0, 0, 0, 0],
  tipOrientation: [0, 0, 0, 0]
};
function hh(e) {
  const n = Ue.indexOf(e);
  if (n === -1) throw new Error(`pyraminx-state: unknown vertex "${e}"`);
  return n;
}
function mh(e, n) {
  let t = Array.from({ length: Se }, (o, i) => i), r = new Array(Se).fill(0);
  for (let o = 0; o < n; o += 1) {
    const i = new Array(Se), s = new Array(Se);
    for (let c = 0; c < Se; c += 1) {
      const a = t[c];
      i[c] = e.edgeDestination[a], s[c] = (r[c] + e.edgeFlip[a]) % 2;
    }
    t = i, r = s;
  }
  return {
    vertex: e.vertex,
    edgeDestination: t,
    edgeFlip: r,
    axialTwist: e.axialTwist.map((o) => o * n % 3)
  };
}
function gh() {
  const e = /* @__PURE__ */ new Map();
  for (const n of Ue) {
    const t = ph(n);
    for (const r of [1, 2])
      e.set(`${n}${r}`, mh(t, r));
  }
  return e;
}
var vh = gh();
function wh(e, n) {
  const t = vh.get(`${e}${n}`);
  if (!t) throw new Error(`pyraminx-state: no turn table for ${e}${n}`);
  return t;
}
function pu(e, n) {
  const t = hh(n.vertex);
  if (n.tip) {
    const a = [...e.tipOrientation];
    return a[t] = (a[t] + n.amount) % 3, { ...e, tipOrientation: a };
  }
  const r = wh(n.vertex, n.amount), o = new Array(Se), i = new Array(Se);
  for (let a = 0; a < Se; a += 1) {
    const u = r.edgeDestination[a];
    o[u] = e.edgePermutation[a], i[u] = (e.edgeOrientation[a] + r.edgeFlip[a]) % 2;
  }
  const s = e.axialOrientation.map(
    (a, u) => (a + r.axialTwist[u]) % 3
  ), c = e.tipOrientation.map((a, u) => (a + r.axialTwist[u]) % 3);
  return { edgePermutation: o, edgeOrientation: i, axialOrientation: s, tipOrientation: c };
}
function Sh(e, n) {
  return n.reduce(pu, e);
}
function Eh(e) {
  const n = je(e, Se);
  it(n) === 1 && fa(n);
  const t = new Array(Se);
  let r = 0;
  for (let s = 0; s < Se - 1; s += 1) {
    const c = we(e, 2);
    t[s] = c, r += c;
  }
  t[Se - 1] = r % 2;
  const o = Array.from({ length: un }, () => we(e, 3)), i = Array.from({ length: un }, () => we(e, 3));
  return { edgePermutation: n, edgeOrientation: t, axialOrientation: o, tipOrientation: i };
}
var Ci = Pd(Se), hu = Ci.length, En = 2 ** Se, yn = 3 ** un, yh = new Map(
  Ci.map((e, n) => [e.join(","), n])
);
function Ui(e) {
  const n = yh.get(e.join(","));
  if (n === void 0)
    throw new Error(
      `pyraminx-coordinates: [${e.join(",")}] is not a permutation of the 6 edges`
    );
  return n;
}
function bh(e) {
  const n = Ci[e];
  if (!n) throw new Error(`pyraminx-coordinates: edge permutation coord ${e} out of range`);
  return [...n];
}
function mu(e) {
  let n = 0;
  for (let t = 0; t < Se; t += 1)
    n = n * 2 + e[t];
  return n;
}
function xh(e) {
  const n = new Array(Se);
  let t = e;
  for (let r = Se - 1; r >= 0; r -= 1)
    n[r] = t % 2, t = (t - n[r]) / 2;
  return n;
}
function gu(e) {
  let n = 0;
  for (let t = 0; t < un; t += 1)
    n = n * 3 + e[t];
  return n;
}
function Oh(e) {
  const n = new Array(un);
  let t = e;
  for (let r = un - 1; r >= 0; r -= 1)
    n[r] = t % 3, t = (t - n[r]) / 3;
  return n;
}
function vu(e) {
  return {
    edgePerm: Ui(e.edgePermutation),
    edgeOrientation: mu(e.edgeOrientation),
    axial: gu(e.axialOrientation)
  };
}
function wu(e) {
  return (e.edgePerm * En + e.edgeOrientation) * yn + e.axial;
}
var Th = hu * En * yn, Jt = {
  edgePerm: Ui([0, 1, 2, 3, 4, 5]),
  edgeOrientation: 0,
  axial: 0
};
function Mh(e) {
  return e.edgePerm === Jt.edgePerm && e.edgeOrientation === Jt.edgeOrientation && e.axial === Jt.axial;
}
var dn = uh(), Ah = dn.length;
function Ii(e, n, t) {
  const r = [];
  for (let o = 0; o < Ah; o += 1) {
    const i = dn[o], s = new Array(e);
    for (let c = 0; c < e; c += 1)
      s[c] = t(pu(n(c), i));
    r.push(s);
  }
  return r;
}
var Rh = null, Ph = null, _h = null;
function Su() {
  return Rh ?? (Rh = Ii(
    hu,
    (e) => ({ ...Cr, edgePermutation: bh(e) }),
    (e) => Ui(e.edgePermutation)
  ));
}
function Eu() {
  return Ph ?? (Ph = Ii(
    En,
    (e) => ({
      ...Cr,
      edgeOrientation: xh(e)
    }),
    (e) => mu(e.edgeOrientation)
  ));
}
function yu() {
  return _h ?? (_h = Ii(
    yn,
    (e) => ({ ...Cr, axialOrientation: Oh(e) }),
    (e) => gu(e.axialOrientation)
  ));
}
new Map(
  dn.map((e, n) => [`${e.vertex}${e.amount}`, n])
);
function bu(e, n) {
  return Su()[n][e];
}
function xu(e, n) {
  return Eu()[n][e];
}
function Ou(e, n) {
  return yu()[n][e];
}
function Ch() {
  Su(), Eu(), yu();
}
var vr = 255;
function Uh() {
  const e = new Uint8Array(Th).fill(vr), n = wu(Jt);
  e[n] = 0;
  let t = [n], r = 0;
  for (; t.length > 0; ) {
    const o = [];
    for (const i of t) {
      const s = i % yn, c = (i - s) / yn, a = c % En, u = (c - a) / En;
      for (let f = 0; f < dn.length; f += 1) {
        const l = (bu(u, f) * En + xu(a, f)) * yn + Ou(s, f);
        e[l] === vr && (e[l] = r + 1, o.push(l));
      }
    }
    t = o, r += 1;
  }
  return e;
}
var Ih = null;
function Tu() {
  return Ih ?? (Ih = Uh());
}
function Fi(e) {
  return Tu()[wu(e)];
}
function Fh() {
  return Tu();
}
var Dh = dn.map((e, n) => n);
function Ns(e) {
  const n = Fi(vu(e));
  if (n === vr)
    throw new Error("pyraminxLayerSolveDistance: state is not reachable on a real Pyraminx");
  return n;
}
function Nh(e, n, t = Dh) {
  const r = vu(e);
  if (Fi(r) === vr)
    throw new Error("solvePyraminxLayersInExactly: state is not reachable on a real Pyraminx");
  if (n === 0) return Mh(r) ? [] : null;
  const o = [];
  return Mu(r, 0, n, o, t) ? [...o] : null;
}
function Mu(e, n, t, r, o) {
  const i = Fi(e);
  if (n + i > t) return !1;
  if (n === t) return i === 0;
  const s = r[r.length - 1];
  for (const c of o) {
    const a = dn[c];
    if (s && s.vertex === a.vertex) continue;
    const u = {
      edgePerm: bu(e.edgePerm, c),
      edgeOrientation: xu(e.edgeOrientation, c),
      axial: Ou(e.axial, c)
    };
    if (r.push(a), Mu(u, n + 1, t, r, o)) return !0;
    r.pop();
  }
  return !1;
}
function Lh(e, n) {
  const t = [];
  for (let r = 0; r < un; r += 1) {
    const o = (n[r] - e[r] + 3) % 3;
    o !== 0 && t.push({ vertex: Ue[r], amount: o, tip: !0 });
  }
  return t;
}
var $h = 6, kh = 11;
function Bh(e) {
  const n = wt(
    e,
    Eh,
    Ns,
    $h
  ), t = je(e, dn.length), r = ri(
    Ns(n),
    kh,
    (s) => Nh(n, s, t)
  ), o = ah(r), i = Sh(Cr, o);
  return sh([
    ...o,
    ...Lh(i.tipOrientation, n.tipOrientation)
  ]);
}
function jh() {
  Ch(), Fh();
}
function Vh() {
  Te(
    "pyram",
    (e) => Bh(e),
    "random-state",
    jh
  );
}
var Di = ["U", "R", "L", "B"], qh = [1, 2];
function Gh(e) {
  return e.amount === 2 ? `${e.corner}'` : e.corner;
}
function Kh(e) {
  return e.map(Gh).join(" ");
}
function Xh(e) {
  return { corner: e.corner, amount: 3 - e.amount };
}
function Wh(e) {
  return [...e].reverse().map(Xh);
}
function Yh() {
  const e = [];
  for (const n of Di)
    for (const t of qh) e.push({ corner: n, amount: t });
  return e;
}
var Ur = [
  [1, 1, 1],
  //  0 — the held corner (white up, green front-left)
  [1, 1, -1],
  //  1
  [1, -1, 1],
  //  2
  [-1, 1, 1],
  //  3
  [1, -1, -1],
  //  4 — R
  [-1, 1, -1],
  //  5 — U
  [-1, -1, 1],
  //  6 — L
  [-1, -1, -1]
  // 7 — B
], Ge = Ur.length, Ni = [
  [1, 0, 0],
  //  0 +x  (front-right in the WCA holding)
  [-1, 0, 0],
  // 1 -x
  [0, 1, 0],
  //  2 +y  (white / up)
  [0, -1, 0],
  // 3 -y
  [0, 0, 1],
  //  4 +z  (green / front-left)
  [0, 0, -1]
  // 5 -z
], bn = Ni.length, Hh = {
  U: [-1, 1, -1],
  R: [1, -1, -1],
  L: [-1, -1, 1],
  B: [-1, -1, -1]
};
function zh(e) {
  const n = Ur.findIndex((t) => fn(t, e));
  if (n === -1) throw new Error(`skewb-geometry: no corner at [${e.join(",")}]`);
  return n;
}
function Jh(e) {
  const n = Ni.findIndex((t) => fn(t, e));
  if (n === -1) throw new Error(`skewb-geometry: no center at [${e.join(",")}]`);
  return n;
}
function Qh(e) {
  const n = [0, e[1], 0], t = rn(e, n, 1), r = rn(e, t, 1);
  return [n, t, r];
}
var Ls = Ur.map(Qh);
function Au(e) {
  const n = Hh[e], t = [], r = [], o = [];
  for (let i = 0; i < Ge; i += 1) {
    const s = Ur[i];
    if (Ao(s, n) < 0) {
      t[i] = i, r[i] = 0;
      continue;
    }
    const c = rn(n, s, -1), a = zh(c);
    t[i] = a;
    const u = rn(n, Ls[i][0], -1), l = Ls[a].findIndex((d) => fn(d, u));
    if (l === -1)
      throw new Error(
        `skewb-geometry: ${e} carried corner ${i}'s reference sticker onto a face that is not one of its own`
      );
    r[i] = l;
  }
  for (let i = 0; i < bn; i += 1) {
    const s = Ni[i];
    o[i] = Ao(s, n) < 0 ? i : Jh(rn(n, s, -1));
  }
  return { corner: e, cornerDestination: t, cornerTwist: r, centerDestination: o };
}
Object.freeze(
  Object.fromEntries(Di.map((e) => [e, Au(e)]))
);
var ft = {
  cornerPermutation: [0, 1, 2, 3, 4, 5, 6, 7],
  cornerOrientation: [0, 0, 0, 0, 0, 0, 0, 0],
  centerPermutation: [0, 1, 2, 3, 4, 5]
};
function Zh(e, n) {
  let t = Array.from({ length: Ge }, (i, s) => s), r = new Array(Ge).fill(0), o = Array.from({ length: bn }, (i, s) => s);
  for (let i = 0; i < n; i += 1) {
    const s = new Array(Ge), c = new Array(Ge);
    for (let u = 0; u < Ge; u += 1) {
      const f = t[u];
      s[u] = e.cornerDestination[f], c[u] = (r[u] + e.cornerTwist[f]) % 3;
    }
    const a = new Array(bn);
    for (let u = 0; u < bn; u += 1)
      a[u] = e.centerDestination[o[u]];
    t = s, r = c, o = a;
  }
  return { corner: e.corner, cornerDestination: t, cornerTwist: r, centerDestination: o };
}
function e1() {
  const e = /* @__PURE__ */ new Map();
  for (const n of Di) {
    const t = Au(n);
    for (const r of [1, 2]) e.set(`${n}${r}`, Zh(t, r));
  }
  return e;
}
var n1 = e1();
function t1(e, n) {
  const t = n1.get(`${e}${n}`);
  if (!t) throw new Error(`skewb-state: no turn table for ${e}${n}`);
  return t;
}
function Ru(e, n) {
  const t = t1(n.corner, n.amount), r = new Array(Ge), o = new Array(Ge);
  for (let s = 0; s < Ge; s += 1) {
    const c = t.cornerDestination[s];
    r[c] = e.cornerPermutation[s], o[c] = (e.cornerOrientation[s] + t.cornerTwist[s]) % 3;
  }
  const i = new Array(bn);
  for (let s = 0; s < bn; s += 1)
    i[t.centerDestination[s]] = e.centerPermutation[s];
  return { cornerPermutation: r, cornerOrientation: o, centerPermutation: i };
}
var lt = Yh(), Pu = lt.length;
function _u(e, n, t) {
  const r = [e], o = /* @__PURE__ */ new Map([[n(e), 0]]);
  for (let s = 0; s < r.length; s += 1)
    for (const c of lt) {
      const a = t(r[s], c), u = n(a);
      o.has(u) || (o.set(u, r.length), r.push(a));
    }
  const i = lt.map(
    (s) => r.map((c) => o.get(n(t(c, s))))
  );
  return {
    values: r,
    transition: i,
    indexOf(s) {
      const c = o.get(n(s));
      if (c === void 0)
        throw new Error(`skewb-coordinates: ${n(s)} is not a reachable projection value`);
      return c;
    }
  };
}
function r1(e) {
  return `${e.cornerPermutation.join(",")}|${e.cornerOrientation.join("")}`;
}
function o1(e, n) {
  const t = Ru({ ...ft, ...e }, n);
  return { cornerPermutation: t.cornerPermutation, cornerOrientation: t.cornerOrientation };
}
function i1(e) {
  return e.join(",");
}
function s1(e, n) {
  return Ru({ ...ft, centerPermutation: e }, n).centerPermutation;
}
var c1 = null, a1 = null;
function Ir() {
  return c1 ?? (c1 = _u(
    {
      cornerPermutation: ft.cornerPermutation,
      cornerOrientation: ft.cornerOrientation
    },
    r1,
    o1
  ));
}
function Fr() {
  return a1 ?? (a1 = _u(
    ft.centerPermutation,
    i1,
    s1
  ));
}
function u1() {
  return Ir().values.length;
}
function Dr() {
  return Fr().values.length;
}
function f1(e) {
  return Ir().indexOf(e);
}
function l1(e) {
  return Fr().indexOf(e.centerPermutation);
}
function Cu(e, n) {
  return Ir().transition[n][e];
}
function Uu(e, n) {
  return Fr().transition[n][e];
}
function Iu(e) {
  return { corners: f1(e), centers: l1(e) };
}
function d1(e) {
  return e.corners * Dr() + e.centers;
}
function Fu() {
  return u1() * Dr();
}
function p1(e) {
  const n = Dr(), t = e % n, r = (e - t) / n, o = Ir().values[r], i = Fr().values[t];
  if (!o || !i)
    throw new Error(`skewb-coordinates: packed index ${e} out of range`);
  return {
    cornerPermutation: o.cornerPermutation,
    cornerOrientation: o.cornerOrientation,
    centerPermutation: i
  };
}
var $s = 0;
function h1(e) {
  return e.corners === 0 && e.centers === 0;
}
var dt = 255;
function m1() {
  const e = Dr(), n = new Uint8Array(Fu()).fill(dt);
  n[$s] = 0;
  let t = [$s], r = 0;
  for (; t.length > 0; ) {
    const o = [];
    for (const i of t) {
      const s = i % e, c = (i - s) / e;
      for (let a = 0; a < Pu; a += 1) {
        const u = Cu(c, a) * e + Uu(s, a);
        n[u] === dt && (n[u] = r + 1, o.push(u));
      }
    }
    t = o, r += 1;
  }
  return n;
}
var g1 = null;
function Li() {
  return g1 ?? (g1 = m1());
}
function $i(e) {
  return Li()[d1(e)];
}
function v1(e) {
  return Li()[e];
}
function w1() {
  return Li();
}
function S1(e) {
  const n = Fu();
  for (; ; ) {
    const t = we(e, n);
    if (v1(t) !== dt)
      return p1(t);
  }
}
var E1 = lt.map((e, n) => n);
function ks(e) {
  const n = $i(Iu(e));
  if (n === dt)
    throw new Error("skewbSolveDistance: state is not reachable on a real Skewb");
  return n;
}
function y1(e, n, t = E1) {
  const r = Iu(e);
  if ($i(r) === dt)
    throw new Error("solveSkewbInExactly: state is not reachable on a real Skewb");
  if (n === 0) return h1(r) ? [] : null;
  const o = [];
  return Du(r, 0, n, o, t) ? [...o] : null;
}
function Du(e, n, t, r, o) {
  const i = $i(e);
  if (n + i > t) return !1;
  if (n === t) return i === 0;
  const s = r[r.length - 1];
  for (const c of o) {
    const a = lt[c];
    if (s && s.corner === a.corner) continue;
    const u = {
      corners: Cu(e.corners, c),
      centers: Uu(e.centers, c)
    };
    if (r.push(a), Du(u, n + 1, t, r, o)) return !0;
    r.pop();
  }
  return !1;
}
var b1 = 7, x1 = 11;
function O1(e) {
  const n = wt(
    e,
    S1,
    ks,
    b1
  ), t = je(e, Pu), r = ri(
    ks(n),
    x1,
    (o) => y1(n, o, t)
  );
  return Kh(Wh(r));
}
function T1() {
  w1();
}
function M1() {
  Te(
    "skewb",
    (e) => O1(e),
    "random-state",
    T1
  );
}
var sn = 12, nt = { kind: "slice" }, A1 = 6;
function pt(e) {
  if (!Number.isInteger(e))
    throw new Error(`square1-notation: turn amount must be an integer, got ${e}`);
  return (e % sn + sn) % sn;
}
function Bs(e) {
  const n = pt(e);
  return n > A1 ? n - sn : n;
}
function zn(e) {
  return e.kind === "turn";
}
function Tt() {
  const e = [];
  for (let n = 0; n < sn; n += 1)
    for (let t = 0; t < sn; t += 1)
      n === 0 && t === 0 || e.push({ kind: "turn", top: n, bottom: t });
  return e;
}
function R1(e) {
  return e.kind === "slice" ? "/" : `(${Bs(e.top)},${Bs(e.bottom)})`;
}
function P1(e) {
  return e.map(R1).join(" ");
}
function js(e) {
  const n = [];
  for (const t of e) {
    const r = n[n.length - 1];
    if (r !== void 0 && zn(t) && zn(r)) {
      n.pop();
      const o = pt(r.top + t.top), i = pt(r.bottom + t.bottom);
      (o !== 0 || i !== 0) && n.push({ kind: "turn", top: o, bottom: i });
      continue;
    }
    if (r !== void 0 && !zn(t) && !zn(r)) {
      n.pop();
      continue;
    }
    n.push(t);
  }
  return n;
}
function _1(e) {
  return e.kind === "slice" ? nt : { kind: "turn", top: pt(-e.top), bottom: pt(-e.bottom) };
}
function C1(e) {
  return [...e].reverse().map(_1);
}
var I = sn, Nu = 2 * I, Ze = 0, en = I, Nr = [Ze, en], ye = 8;
function Lr(e) {
  return e < ye;
}
var xn = {
  slots: [
    0,
    0,
    8,
    1,
    1,
    9,
    2,
    2,
    10,
    3,
    3,
    11,
    4,
    4,
    12,
    5,
    5,
    13,
    6,
    6,
    14,
    7,
    7,
    15
  ],
  middleFlipped: !1
}, U1 = [9, 10, 11, 0, 1, 2];
function I1(e) {
  return I - 1 - e;
}
var F1 = [
  [2, 3],
  [8, 9]
];
function $r(e) {
  for (const n of Nr)
    for (const [t, r] of F1)
      if (e.slots[n + t] === e.slots[n + r]) return !1;
  return !0;
}
var D1 = class extends Error {
  constructor() {
    super("@cubesmith/scrambler: this Square-1 state cannot be sliced — a corner straddles the cut"), this.name = "Square1IllegalSliceError";
  }
};
function kr(e, n) {
  const t = e.slots.slice();
  for (let r = 0; r < I; r += 1)
    t[Ze + (r + n.top) % I] = e.slots[Ze + r], t[en + (r - n.bottom + I) % I] = e.slots[en + r];
  return { slots: t, middleFlipped: e.middleFlipped };
}
function Mt(e) {
  if (!$r(e)) throw new D1();
  return N1(e);
}
function N1(e) {
  const n = e.slots.slice();
  for (const t of U1) {
    const r = I1(t);
    n[Ze + r] = e.slots[en + t], n[en + r] = e.slots[Ze + t];
  }
  return { slots: n, middleFlipped: !e.middleFlipped };
}
function L1(e, n) {
  return zn(n) ? kr(e, n) : Mt(e);
}
function Vs(e, n) {
  let t = e;
  for (const r of n) t = L1(t, r);
  return t;
}
function $1(e, n) {
  if (e.middleFlipped !== n.middleFlipped) return !1;
  for (let t = 0; t < Nu; t += 1)
    if (e.slots[t] !== n.slots[t]) return !1;
  return !0;
}
function qs(e) {
  return $1(e, xn);
}
function Pn(e) {
  let n = 0;
  for (const t of Nr)
    for (let r = 0; r < I; r += 1) {
      const o = e.slots[t + r];
      if (!Lr(o)) continue;
      e.slots[t + (r + I - 1) % I] !== o && (n |= 1 << t + r);
    }
  return n;
}
function k1(e, n) {
  const t = [];
  for (let r = 0; r < I; r += 1) {
    const o = e.slots[n + r], i = e.slots[n + (r + I - 1) % I];
    o !== i && t.push(Lr(o));
  }
  return t.length !== 8 ? !1 : t.every((r, o) => r !== t[(o + 1) % t.length]);
}
function ki(e) {
  return Nr.every((n) => k1(e, n));
}
function B1(e) {
  if (!ki(e)) return;
  const n = Nr.map((t) => {
    for (let r = 0; r < I; r += 1) {
      const o = e.slots[t + r], i = e.slots[t + (r + I - 1) % I];
      if (Lr(o) && o !== i) return r % 3;
    }
    throw new Error("@cubesmith/scrambler: a square Square-1 ring with no corners");
  });
  return [n[0], n[1]];
}
var qe = 9, ne = 40320;
function Br(e, n) {
  return e * 3 + n;
}
function Lu(e) {
  return [Math.floor(e / 3), e % 3];
}
var ht = Br(0, 0);
function wr(e, n, t) {
  const r = [];
  for (let o = 0; o < 4; o += 1)
    r.push(e + (n + t + 3 * o) % I);
  return r.sort((o, i) => o - i);
}
function Bi(e) {
  const [n, t] = Lu(e);
  return [
    ...wr(Ze, n, 0),
    ...wr(en, t, 0)
  ];
}
function ji(e) {
  const [n, t] = Lu(e);
  return [
    ...wr(Ze, n, 2),
    ...wr(en, t, 2)
  ];
}
function mt(e) {
  let n = 0;
  for (let t = 0; t < e.length; t += 1) {
    let r = 0;
    for (let o = t + 1; o < e.length; o += 1)
      e[o] < e[t] && (r += 1);
    n = n * (e.length - t) + r;
  }
  return n;
}
function Fo(e, n) {
  const t = [];
  let r = e;
  for (let i = 1; i <= n; i += 1)
    t.unshift(r % i), r = Math.floor(r / i);
  if (r !== 0)
    throw new Error(`@cubesmith/scrambler: permutation index ${e} is out of range for ${n}`);
  const o = Array.from({ length: n }, (i, s) => s);
  return t.map((i) => o.splice(i, 1)[0]);
}
var j1 = class extends Error {
  constructor() {
    super("@cubesmith/scrambler: phase 2 needs both Square-1 layers square; phase 1 comes first"), this.name = "NotSquareLayersError";
  }
};
function $u(e) {
  const n = B1(e);
  if (!n) throw new j1();
  return n;
}
function ku(e) {
  const n = $u(e), t = Br(n[0], n[1]), r = Bi(t).map((i) => e.slots[i]), o = ji(t).map(
    (i) => e.slots[i] - ye
  );
  return {
    alignment: t,
    middleFlipped: e.middleFlipped,
    corners: mt(r),
    edges: mt(o)
  };
}
function V1(e) {
  const n = new Array(Nu).fill(-1), t = Fo(e.corners, ye);
  Bi(e.alignment).forEach((o, i) => {
    const s = o < I ? Ze : en;
    n[o] = t[i], n[s + (o - s + 1) % I] = t[i];
  });
  const r = Fo(e.edges, ye);
  return ji(e.alignment).forEach((o, i) => {
    n[o] = r[i] + ye;
  }), { slots: n, middleFlipped: e.middleFlipped };
}
function q1(e) {
  return V1({
    alignment: e,
    middleFlipped: !1,
    corners: 0,
    edges: 0
  });
}
function Gs(e, n) {
  if (!ki(n)) return;
  const t = $u(n), r = Br(t[0], t[1]), o = new Array(ye).fill(-1), i = new Array(ye).fill(-1);
  if (Bi(r).forEach((s, c) => {
    o[n.slots[s]] = c;
  }), ji(r).forEach((s, c) => {
    i[n.slots[s] - ye] = c;
  }), o.includes(-1) || i.includes(-1))
    throw new Error(`@cubesmith/scrambler: incoherent Square-1 phase-2 move from alignment ${e}`);
  return { alignment: r, cornerMap: o, edgeMap: i };
}
function G1(e, n) {
  const t = new Array(e.length).fill(-1);
  for (let r = 0; r < e.length; r += 1)
    t[n[r]] = e[r];
  return t;
}
var _t;
function Dn() {
  if (_t) return _t;
  const e = Tt(), n = e.length, t = new Int32Array(qe * n), r = new Int32Array(qe * n), o = new Int32Array(qe * n), i = new Int32Array(qe).fill(-1), s = new Int32Array(qe).fill(-1), c = new Int32Array(qe).fill(-1), a = [], u = /* @__PURE__ */ new Map(), f = (d) => {
    const p = d.join(","), v = u.get(p);
    return v !== void 0 ? v : (u.set(p, a.length), a.push([...d]), a.length - 1);
  };
  for (let d = 0; d < qe; d += 1) {
    const p = q1(d);
    for (const [M, C] of e.entries()) {
      const L = Gs(d, kr(p, C));
      if (!L)
        throw new Error("@cubesmith/scrambler: a Square-1 layer turn left the square-layers set");
      const R = d * n + M;
      t[R] = L.alignment, r[R] = f(L.cornerMap), o[R] = f(L.edgeMap);
    }
    if (!$r(p)) continue;
    const v = Gs(d, Mt(p));
    v && (i[d] = v.alignment, s[d] = f(v.cornerMap), c[d] = f(v.edgeMap));
  }
  const l = new Int32Array(a.length * ne);
  for (let d = 0; d < ne; d += 1) {
    const p = Fo(d, ye);
    for (const [v, M] of a.entries())
      l[v * ne + d] = mt(
        G1(p, M)
      );
  }
  return _t = {
    turns: e,
    turnAlignment: t,
    turnCornerMap: r,
    turnEdgeMap: o,
    sliceAlignment: i,
    sliceCornerMap: s,
    sliceEdgeMap: c,
    maps: a,
    permMove: l
  }, _t;
}
var Ks = qe * 2 * ne;
function K1(e, n, t) {
  return (e * 2 + 0) * ne + t;
}
function Bu(e) {
  const {
    turns: n,
    turnAlignment: t,
    turnCornerMap: r,
    turnEdgeMap: o,
    sliceAlignment: i,
    sliceCornerMap: s,
    sliceEdgeMap: c,
    permMove: a
  } = Dn(), u = e ? r : o, f = e ? s : c, l = n.length, d = new Uint8Array(Ks).fill(255), p = new Int32Array(Ks), v = K1(ht, !1, 0);
  d[v] = 0, p[0] = v;
  let M = 1;
  for (let C = 0; C < M; C += 1) {
    const L = p[C], R = L % ne, G = (L - R) / ne, $ = G % 2, K = (G - $) / 2, ee = d[L] + 1;
    for (let V = 0; V < l; V += 1) {
      const Y = K * l + V, ce = a[u[Y] * ne + R], ae = (t[Y] * 2 + $) * ne + ce;
      d[ae] === 255 && (d[ae] = ee, p[M] = ae, M += 1);
    }
    const Q = i[K];
    if (Q < 0) continue;
    const re = a[f[K] * ne + R], j = (Q * 2 + (1 - $)) * ne + re;
    d[j] === 255 && (d[j] = ee, p[M] = j, M += 1);
  }
  return d;
}
var X1 = qe * 2 * 2 * 2;
function tt(e, n, t, r) {
  return ((e * 2 + (n ? 1 : 0)) * 2 + t) * 2 + r;
}
function W1(e) {
  const n = new Array(e.length).fill(!1);
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    if (n[r]) continue;
    let o = 0;
    for (let i = r; !n[i]; i = e[i])
      n[i] = !0, o += 1;
    t += o - 1;
  }
  return t % 2;
}
var co;
function ju() {
  if (co) return co;
  const e = Dn(), n = e.turns.length, t = e.maps.map(W1), r = new Uint8Array(X1), o = tt(ht, !1, 0, 0);
  r[o] = 1;
  const i = [o];
  for (let s = 0; s < i.length; s += 1) {
    const c = i[s], a = c % 2, u = Math.floor(c / 2) % 2, f = Math.floor(c / 4) % 2, l = Math.floor(c / 8), d = [];
    for (let v = 0; v < n; v += 1) {
      const M = l * n + v;
      d.push(
        tt(
          e.turnAlignment[M],
          f === 1,
          u ^ t[e.turnCornerMap[M]],
          a ^ t[e.turnEdgeMap[M]]
        )
      );
    }
    const p = e.sliceAlignment[l];
    p >= 0 && d.push(
      tt(
        p,
        f === 0,
        u ^ t[e.sliceCornerMap[l]],
        a ^ t[e.sliceEdgeMap[l]]
      )
    );
    for (const v of d)
      r[v] !== 1 && (r[v] = 1, i.push(v));
  }
  return co = r, r;
}
function Vu(e, n, t, r) {
  return ((e * 2 + (n ? 1 : 0)) * ne + t) * ne + r;
}
var Do = 8, Ct;
function qu(e, n, t, r, o) {
  return (Math.imul(t, 2654435761) ^ Math.imul(r, 40503) ^ Math.imul(e * 2 + n, 2246822519)) & o;
}
function ao(e, n, t, r, o) {
  const i = Vu(n, t === 1, r, o);
  let s = qu(n, t, r, o, e.mask);
  for (; ; ) {
    const c = e.keys[s];
    if (c === i) return e.distances[s];
    if (c === -1) return -1;
    s = s + 1 & e.mask;
  }
}
function Gu() {
  if (Ct) return Ct;
  const {
    turns: e,
    turnAlignment: n,
    turnCornerMap: t,
    turnEdgeMap: r,
    sliceAlignment: o,
    sliceCornerMap: i,
    sliceEdgeMap: s,
    permMove: c
  } = Dn(), a = e.length;
  let u = 2;
  for (; u < 2e6; ) u *= 2;
  const f = u - 1, l = new Float64Array(u).fill(-1), d = new Uint8Array(u);
  let p = 0;
  const v = (G, $, K, ee, Q) => {
    const re = Vu(G, $ === 1, K, ee);
    let j = qu(G, $, K, ee, f);
    for (; ; ) {
      const V = l[j];
      if (V === re) return !1;
      if (V === -1)
        return l[j] = re, d[j] = Q, p += 1, !0;
      j = j + 1 & f;
    }
  };
  let M = Int32Array.of(ht), C = Int32Array.of(0), L = Int32Array.of(0), R = Int32Array.of(0);
  v(ht, 0, 0, 0, 0);
  for (let G = 1; G <= Do; G += 1) {
    const $ = M.length * (a + 1), K = new Int32Array($), ee = new Int32Array($), Q = new Int32Array($), re = new Int32Array($);
    let j = 0;
    const V = (Y, ce, ae, he) => {
      v(Y, ce, ae, he, G) && (K[j] = Y, ee[j] = ce, Q[j] = ae, re[j] = he, j += 1);
    };
    for (let Y = 0; Y < M.length; Y += 1) {
      const ce = M[Y], ae = C[Y], he = L[Y], J = R[Y];
      for (let ue = 0; ue < a; ue += 1) {
        const se = ce * a + ue;
        V(
          n[se],
          ae,
          c[t[se] * ne + he],
          c[r[se] * ne + J]
        );
      }
      const le = o[ce];
      le < 0 || V(
        le,
        1 - ae,
        c[i[ce] * ne + he],
        c[s[ce] * ne + J]
      );
    }
    M = K.subarray(0, j), C = ee.subarray(0, j), L = Q.subarray(0, j), R = re.subarray(0, j);
  }
  return Ct = { keys: l, distances: d, mask: f, size: p }, Ct;
}
var Xs, Ws;
function jr() {
  return Xs ?? (Xs = Bu(!0)), Xs;
}
function Ku(e = !1) {
  return e ? (Ws ?? (Ws = Bu(!1)), Ws) : jr();
}
function Y1() {
  const e = Array.from({ length: I }, () => []);
  for (let n = 0; n < 1 << I; n += 1) {
    let t = 0, r = !1;
    for (let o = 0; o < I; o += 1)
      if ((n & 1 << o) !== 0 && (t += 1, (n & 1 << (o + 1) % I) !== 0)) {
        r = !0;
        break;
      }
    r || e[t].push(n);
  }
  return e;
}
var Ys;
function Hs(e) {
  return Ys ?? (Ys = Y1()), Ys[e] ?? [];
}
function Vi() {
  const e = [];
  for (let n = 2; n <= 6; n += 1)
    for (const t of Hs(n))
      for (const r of Hs(ye - n))
        e.push(t | r << I);
  return e;
}
var H1 = 260 | 1 << I + 2 | 1 << I + 8;
function z1(e) {
  return (e & H1) === 0;
}
function Xu(e) {
  const n = [], t = [];
  for (const r of [0, I]) {
    const o = e >>> r & (1 << I) - 1;
    for (let i = 0; i < I; i += 1) {
      if ((o & 1 << i) !== 0) {
        n.push(r + i);
        continue;
      }
      const s = (i + I - 1) % I;
      (o & 1 << s) === 0 && t.push(r + i);
    }
  }
  return { corners: n, edges: t };
}
function Wu(e, n, t, r) {
  const { corners: o, edges: i } = Xu(e);
  if (o.length !== n.length || i.length !== t.length)
    throw new Error("@cubesmith/scrambler: Square-1 shape does not have that many positions");
  const s = new Array(2 * I).fill(-1);
  return o.forEach((c, a) => {
    const u = c < I ? 0 : I;
    s[c] = n[a], s[u + (c - u + 1) % I] = n[a];
  }), i.forEach((c, a) => {
    s[c] = t[a] + ye;
  }), { slots: s, middleFlipped: r };
}
var Ut;
function J1() {
  if (Ut) return Ut;
  const e = Tt(), n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), r = Pn(xn);
  n.set(r, xn), t.set(r, 0);
  const o = [r];
  for (let i = 0; i < o.length; i += 1) {
    const s = o[i], c = n.get(s), a = t.get(s) + 1, u = e.map((f) => kr(c, f));
    $r(c) && u.push(Mt(c));
    for (const f of u) {
      const l = Pn(f);
      t.has(l) || (t.set(l, a), n.set(l, f), o.push(l));
    }
  }
  return Ut = { representative: n, distance: t }, Ut;
}
var Le = (1 << I) - 1;
function At(e) {
  return e & Le;
}
function Rt(e) {
  return e >>> I & Le;
}
function qi(e, n) {
  return e & Le | (n & Le) << I;
}
function Sr(e, n) {
  const t = (n % I + I) % I;
  return (e << t | e >>> I - t) & Le;
}
function Gi(e, n, t) {
  return qi(
    Sr(At(e), n),
    Sr(Rt(e), -t)
  );
}
var zs = 3587, Js = 248, Qs = 260;
function Zs(e) {
  let n = 0;
  for (let t = 0; t < I; t += 1)
    (e & 1 << t) !== 0 && (n |= 1 << (I + 10 - t) % I);
  return n;
}
function Q1(e) {
  return (At(e) & Qs) === 0 && (Rt(e) & Qs) === 0;
}
function Ki(e) {
  if (!Q1(e)) return;
  const n = At(e), t = Rt(e);
  return qi(
    n & Js | Zs(t & zs),
    t & Js | Zs(n & zs)
  );
}
var Z1 = 585;
function ec(e) {
  return Sr(Z1, e);
}
var em = [0, 1, 2].flatMap(
  (e) => [0, 1, 2].map((n) => qi(ec(e), ec(n)))
);
function nc(e, n) {
  if (e === 0 || n % e === 0) return 0;
  let t = e, r = n % e;
  for (; r !== 0; ) [t, r] = [r, t % r];
  return (e - t) % 2;
}
function nm(e) {
  return ~(e | Sr(e, 1)) & Le;
}
function It(e) {
  let n = 0;
  for (let t = e; t !== 0; t &= t - 1) n += 1;
  return n;
}
var Ft;
function tc(e, n) {
  if (!Ft) {
    Ft = new Uint8Array((Le + 1) * I);
    for (let t = 0; t <= Le; t += 1) {
      const r = nm(t), o = It(t), i = It(r);
      for (let s = 0; s < I; s += 1) {
        const c = s === 0 ? 0 : Le << I - s & Le;
        Ft[t * I + s] = nc(o, It(t & c)) ^ nc(i, It(r & c));
      }
    }
  }
  return Ft[e * I + (n % I + I) % I];
}
function Xi(e, n, t) {
  return tc(At(e), n) ^ tc(Rt(e), -t);
}
var rc = /* @__PURE__ */ new Map();
function Wi(e) {
  const n = rc.get(e);
  if (n !== void 0) return n;
  const t = Array.from({ length: ye }, (i, s) => s), r = Wu(e, t, t, !1), o = Vr(Mt(r));
  return rc.set(e, o), o;
}
function Vr(e) {
  const n = [], t = [];
  for (const r of [0, I])
    for (let o = 0; o < I; o += 1) {
      const i = e.slots[r + o], s = e.slots[r + (o + I - 1) % I];
      i !== s && (Lr(i) ? n.push(i) : t.push(i - ye));
    }
  return it(n) ^ it(t);
}
function tm(e) {
  const n = ju();
  for (let t = 0; t < 2; t += 1) {
    const r = n[tt(e, !1, 0, t)] === 1, o = n[tt(e, !0, 0, t)] === 1;
    if (r !== o)
      throw new Error("@cubesmith/scrambler: Square-1 phase-2 parity depends on the middle piece");
    if (r) return t;
  }
  throw new Error("@cubesmith/scrambler: no Square-1 phase-2 parity is reachable at this alignment");
}
var Dt;
function Yu() {
  if (Dt) return Dt;
  const e = Vi(), n = new Map(e.map((o, i) => [o, i])), t = new Uint8Array(e.length * 2).fill(255), r = [];
  for (const o of em) {
    const i = Br(
      oc(At(o)),
      oc(Rt(o))
    ), s = n.get(o) * 2 + tm(i);
    t[s] = 0, r.push(s);
  }
  for (let o = 0; o < r.length; o += 1) {
    const i = r[o], s = i % 2, c = e[(i - s) / 2], a = t[i] + 1, u = [];
    for (let l = 0; l < I; l += 1)
      for (let d = 0; d < I; d += 1)
        l === 0 && d === 0 || u.push(
          n.get(Gi(c, l, d)) * 2 + (s ^ Xi(c, l, d))
        );
    const f = Ki(c);
    f !== void 0 && u.push(n.get(f) * 2 + (s ^ Wi(c)));
    for (const l of u)
      t[l] === 255 && (t[l] = a, r.push(l));
  }
  return Dt = { indexOf: n, keys: e, distance: t }, Dt;
}
function oc(e) {
  for (let n = 0; n < I; n += 1)
    if ((e & 1 << n) !== 0) return n % 3;
  throw new Error("@cubesmith/scrambler: a Square-1 ring with no corners");
}
function ic(e, n) {
  const { indexOf: t, distance: r } = Yu(), o = t.get(e);
  if (o === void 0)
    throw new Error("@cubesmith/scrambler: Square-1 shape key is not a shape the puzzle has");
  return r[o * 2 + n];
}
var uo, fo;
function Hu() {
  if (uo && fo) return { table: uo, indexOf: fo };
  const e = Vi(), n = new Map(e.map((s, c) => [s, c])), t = new Uint8Array(e.length * 4).fill(255), r = (s, c, a) => (s * 2 + c) * 2 + a, o = r(
    n.get(Pn(xn)),
    Vr(xn),
    xn.middleFlipped ? 1 : 0
  );
  t[o] = 0;
  const i = [o];
  for (let s = 0; s < i.length; s += 1) {
    const c = i[s], a = c % 2, u = Math.floor(c / 2) % 2, f = e[Math.floor(c / 4)], l = t[c] + 1, d = [];
    for (const v of Tt())
      d.push(
        r(
          n.get(Gi(f, v.top, v.bottom)),
          u ^ Xi(f, v.top, v.bottom),
          a
        )
      );
    const p = Ki(f);
    p !== void 0 && d.push(r(n.get(p), u ^ Wi(f), 1 - a));
    for (const v of d)
      t[v] === 255 && (t[v] = l, i.push(v));
  }
  return uo = t, fo = n, { table: t, indexOf: n };
}
function lo(e) {
  const { table: n, indexOf: t } = Hu(), r = t.get(Pn(e));
  if (r === void 0)
    throw new Error("@cubesmith/scrambler: Square-1 state has a shape the puzzle cannot make");
  return n[(r * 2 + Vr(e)) * 2 + (e.middleFlipped ? 1 : 0)];
}
function rm(e) {
  const n = Pn(e), { corners: t, edges: r } = Xu(n), o = t.map((s) => e.slots[s]), i = r.map((s) => e.slots[s] - ye);
  return ((Hu().indexOf.get(n) * ne + mt(o)) * ne + mt(i)) * 2 + (e.middleFlipped ? 1 : 0);
}
function om(e, n) {
  if (qs(e)) return 0;
  if (lo(e) > n) return n + 1;
  const t = Tt(), r = /* @__PURE__ */ new Map(), o = (i, s, c, a) => {
    if (s + lo(i) > c) return !1;
    if (qs(i)) return !0;
    const u = rm(i) * 4 + a, f = r.get(u);
    if (f !== void 0 && f <= s) return !1;
    if (r.set(u, s), a !== 1) {
      for (const l of t)
        if (o(
          kr(i, l),
          s + 1,
          c,
          1
          /* Turn */
        ))
          return !0;
    }
    return a === 2 || !$r(i) ? !1 : o(
      Mt(i),
      s + 1,
      c,
      2
      /* Slice */
    );
  };
  for (let i = lo(e); i <= n; i += 1)
    if (r.clear(), o(
      e,
      0,
      i,
      0
      /* Nothing */
    )) return i;
  return n + 1;
}
var sc;
function zu() {
  return sc ?? (sc = Vi().filter(z1)), sc;
}
function im(e) {
  const n = zu();
  return Wu(
    n[we(e, n.length)],
    je(e, ye),
    je(e, ye),
    we(e, 2) === 1
  );
}
function cc(e, n = {}) {
  const t = Pn(e), r = Vr(e), o = n.maxSolutions ?? 1, i = n.extraDepth ?? 0, s = n.accept, c = n.maxPerFirstMove ?? Number.POSITIVE_INFINITY, a = Tt(), u = n.visit, f = [], l = [], d = /* @__PURE__ */ new Map();
  let p = !1, v = 0;
  const M = () => {
    const R = l[0];
    return R === void 0 ? "" : R.kind === "slice" ? "/" : `${R.top},${R.bottom}`;
  }, C = (R, G, $, K, ee) => {
    if (p || v >= o) return;
    const Q = ic(R, G);
    if (Q === 0 && $ === K) {
      if (s && !s(l)) return;
      const j = M(), V = d.get(j) ?? 0;
      if (V >= c) return;
      d.set(j, V + 1), v += 1, u ? u(l) && (p = !0) : f.push([...l]);
      return;
    }
    if ($ + Q > K) return;
    if (ee !== 1) {
      for (const j of a)
        if (l.push(j), C(
          Gi(R, j.top, j.bottom),
          G ^ Xi(R, j.top, j.bottom),
          $ + 1,
          K,
          1
          /* Turn */
        ), l.pop(), p || v >= o) return;
    }
    if (ee === 2) return;
    const re = Ki(R);
    re !== void 0 && (l.push(nt), C(
      re,
      G ^ Wi(R),
      $ + 1,
      K,
      2
      /* Slice */
    ), l.pop());
  }, L = ic(t, r);
  for (let R = L; R <= L + i && (C(
    t,
    r,
    0,
    R,
    0
    /* Nothing */
  ), !(p || v >= o)); R += 1)
    ;
  return f;
}
var Nt;
function sm() {
  if (Nt) return Nt;
  const { turns: e, turnAlignment: n, sliceAlignment: t } = Dn(), r = [], o = [];
  for (let i = 0; i < t.length; i += 1) {
    const s = [], c = [];
    for (let a = 0; a < e.length; a += 1) {
      const u = n[i * e.length + a];
      t[u] >= 0 && s.push(a), u === ht && c.push(a);
    }
    r.push(s), o.push(c);
  }
  return Nt = { enabling: r, closing: o }, Nt;
}
var Ju = class extends Error {
  constructor(e) {
    super(`@cubesmith/scrambler: Square-1 phase 2 gave up after ${e} nodes`), this.name = "Phase2BudgetExceededError";
  }
};
function Qu(e, n = {}) {
  const t = "slots" in e ? ku(e) : e, r = Dn(), { turns: o, turnAlignment: i, turnCornerMap: s, turnEdgeMap: c } = r, { sliceAlignment: a, sliceCornerMap: u, sliceEdgeMap: f, permMove: l } = r, d = jr(), p = Ku(), { enabling: v } = sm(), M = o.length, C = n.maxLength ?? 40, L = n.nodeBudget ?? 4e7;
  let R = 0;
  const G = (V, Y, ce, ae) => Math.max(
    d[(V * 2 + Y) * ne + ce],
    p[(V * 2 + Y) * ne + ae]
  ), $ = [], K = Gu(), ee = (V, Y, ce, ae, he) => {
    let J = { alignment: V, middle: Y, corners: ce, edges: ae };
    for (let le = he; le > 0; le -= 1) {
      const ue = a[J.alignment];
      if (ue >= 0) {
        const oe = {
          alignment: ue,
          middle: 1 - J.middle,
          corners: l[u[J.alignment] * ne + J.corners],
          edges: l[f[J.alignment] * ne + J.edges]
        };
        if (ao(K, oe.alignment, oe.middle, oe.corners, oe.edges) === le - 1) {
          $.push(nt), J = oe;
          continue;
        }
      }
      let se = !1;
      for (let oe = 0; oe < M; oe += 1) {
        const de = J.alignment * M + oe, q = {
          alignment: i[de],
          middle: J.middle,
          corners: l[s[de] * ne + J.corners],
          edges: l[c[de] * ne + J.edges]
        };
        if (ao(K, q.alignment, q.middle, q.corners, q.edges) === le - 1) {
          $.push(o[oe]), J = q, se = !0;
          break;
        }
      }
      if (!se)
        throw new Error("@cubesmith/scrambler: Square-1 backward table has no descending move");
    }
  }, Q = (V, Y, ce, ae, he, J) => {
    if (R += 1, R > L) throw new Ju(R);
    const le = G(V, Y, ce, ae);
    if (he + le > J) return !1;
    if (le === 0) return !0;
    if (le <= Do) {
      const ue = ao(K, V, Y, ce, ae);
      if (ue >= 0)
        return he + ue > J ? !1 : (ee(V, Y, ce, ae, ue), !0);
      if (he + Do >= J) return !1;
    }
    if (a[V] >= 0 && he + 1 <= J) {
      if ($.push(nt), Q(
        a[V],
        1 - Y,
        l[u[V] * ne + ce],
        l[f[V] * ne + ae],
        he + 1,
        J
      ))
        return !0;
      $.pop();
    }
    if (he + 2 > J) return !1;
    for (const ue of v[V]) {
      const se = V * M + ue, oe = i[se], de = l[s[se] * ne + ce], q = l[c[se] * ne + ae];
      if ($.push(o[ue], nt), Q(
        a[oe],
        1 - Y,
        l[u[oe] * ne + de],
        l[f[oe] * ne + q],
        he + 2,
        J
      ))
        return !0;
      $.pop(), $.pop();
    }
    return !1;
  }, re = t.middleFlipped ? 1 : 0, j = G(t.alignment, re, t.corners, t.edges);
  for (let V = j; V <= C; V += 1)
    if ($.length = 0, Q(t.alignment, re, t.corners, t.edges, 0, V))
      return [...$];
}
function cm(e) {
  const n = "slots" in e ? ku(e) : e, t = n.middleFlipped ? 1 : 0;
  return Math.max(
    jr()[(n.alignment * 2 + t) * ne + n.corners],
    Ku()[(n.alignment * 2 + t) * ne + n.edges]
  );
}
var am = class extends Error {
  constructor() {
    super("@cubesmith/scrambler: no Square-1 solution found — the state is not one the puzzle reaches"), this.name = "Square1UnsolvableError";
  }
};
function um(e, n = {}) {
  const t = n.attempts ?? 30, r = n.extraPhase1Depth ?? 1, o = n.phase2NodeBudget ?? 3e5, i = n.maxLength ?? 40, s = n.relaxations ?? [0, 2, 4, 6, 10], c = n.maxPerFirstMove ?? 3;
  for (const [u, f] of s.entries()) {
    const l = f >= 6 ? o * 30 : o;
    let d;
    if (cc(e, {
      maxSolutions: t,
      extraDepth: u === 0 ? 0 : r,
      maxPerFirstMove: c,
      visit: (p) => {
        const v = Vs(e, p);
        if (!ki(v))
          throw new Error("@cubesmith/scrambler: Square-1 phase 1 did not reach square layers");
        const M = Math.min(
          cm(v) + f,
          i - p.length
        ), C = fm(v, { maxLength: M, nodeBudget: l });
        return C ? (d = js([...p, ...C]), !0) : !1;
      }
    }), d) return d;
  }
  const [a] = cc(e, { maxSolutions: 1 });
  if (a) {
    const u = Vs(e, a), f = Qu(u, {
      maxLength: i - a.length,
      // Unbounded on purpose: this runs only when every sweep has been
      // abandoned, and a slow answer beats a thrown one.
      nodeBudget: Number.POSITIVE_INFINITY
    });
    if (f) return js([...a, ...f]);
  }
  throw new am();
}
function fm(e, n) {
  if (!(n.maxLength < 0))
    try {
      return Qu(e, n);
    } catch (t) {
      if (t instanceof Ju) return;
      throw t;
    }
}
var ac = 11;
function lm(e) {
  const n = wt(
    e,
    im,
    // Exact below the threshold and honest above it: the value is either a
    // distance actually achieved or a proof that none that short exists.
    (t) => om(t, ac - 1),
    ac
  );
  return P1(C1(um(n)));
}
function dm() {
  Te(
    "sq1",
    (e) => lm(e),
    "random-state",
    pm
  );
}
function pm() {
  J1(), zu(), Yu(), Dn(), jr(), ju(), Gu();
}
var _n = 4, Pe = 8, Z = 24, Ie = 24;
function uc(e) {
  return [
    e.position[0] - e.normal[0],
    e.position[1] - e.normal[1],
    e.position[2] - e.normal[2]
  ];
}
var Lt;
function hm(e, n) {
  return [0, 1, 2].filter((r) => r !== n).reduce((r, o) => r * 2 + (e[o] > 0 ? 0 : 1), 0);
}
function fc(e) {
  return [Math.sign(e[0]), Math.sign(e[1]), Math.sign(e[2])];
}
function lc(e, n) {
  const t = e.findIndex((r) => tn(r) === tn(n));
  if (t < 0) throw new Error(`444-pieces: no entry for ${tn(n)}`);
  return t;
}
function pn() {
  if (Lt) return Lt;
  const e = va(_n), n = /* @__PURE__ */ new Map();
  for (const [c, a] of e.entries()) {
    const u = tn(uc(a)), f = n.get(u);
    f ? f.push(c) : n.set(u, [c]);
  }
  const t = Array.from({ length: Pe }, () => []), r = Array.from({ length: Z }, () => []), o = new Array(Ie).fill(-1), i = new Array(Ie).fill(-1);
  for (const c of n.values()) {
    const a = uc(e[c[0]]);
    if (c.length === 3) {
      t[lc(Yt, fc(a))] = gm(
        e,
        c,
        a
      );
      continue;
    }
    if (c.length === 2) {
      const p = [0, 1, 2].find((L) => Math.abs(a[L]) === 1), v = fc(a), M = [
        p === 0 ? 0 : v[0],
        p === 1 ? 0 : v[1],
        p === 2 ? 0 : v[2]
      ], C = lc(Ht, M);
      r[2 * C + (a[p] > 0 ? 0 : 1)] = [...c];
      continue;
    }
    const u = c[0], f = [0, 1, 2].find((p) => Math.abs(a[p]) === _n - 1), l = Re.indexOf(e[u].face), d = 4 * l + hm(a, f);
    o[d] = u, i[d] = l;
  }
  if (mm(e, r), !(t.every((c) => c.length === 3) && r.every((c) => c.length === 2) && o.every((c) => c >= 0)))
    throw new Error("444-pieces: the geometry did not account for every piece");
  return Lt = { facelets: e, cornerFacelets: t, wingFacelets: r, centreFacelets: o, centreFace: i }, Lt;
}
function mm(e, n) {
  const t = /* @__PURE__ */ new Map();
  n.forEach((s, c) => s.forEach((a) => t.set(a, c)));
  const r = St(_n).map(
    (s) => ii(e, s, _n)
  ), o = new Array(n.length).fill(-1);
  o[0] = n[0][0];
  const i = [0];
  for (let s = 0; s < i.length; s += 1) {
    const c = i[s];
    for (const a of r) {
      const u = a[o[c]], f = t.get(u);
      if (o[f] === -1) {
        o[f] = u, i.push(f);
        continue;
      }
      if (o[f] !== u)
        throw new Error(
          `444-pieces: wing ${f} would have to flip — the propagated order is inconsistent`
        );
    }
  }
  if (o.some((s) => s === -1))
    throw new Error("444-pieces: the moves do not reach every wing");
  n.forEach((s, c) => {
    const a = o[c];
    n[c] = [a, s.find((u) => u !== a)];
  });
}
function gm(e, n, t) {
  const r = /* @__PURE__ */ new Map();
  for (const s of n) {
    const c = e[s].normal.findIndex((a) => a !== 0);
    r.set(c, s);
  }
  return (Math.sign(t[0] * t[1] * t[2]) > 0 ? [1, 0, 2] : [1, 2, 0]).map((s) => r.get(s));
}
var gt = {
  cornerPermutation: Array.from({ length: Pe }, (e, n) => n),
  cornerOrientation: new Array(Pe).fill(0),
  wingPermutation: Array.from({ length: Z }, (e, n) => n),
  centreColour: Array.from({ length: Ie }, (e, n) => pn().centreFace[n])
}, $t;
function Ee() {
  if ($t) return $t;
  const { facelets: e, cornerFacelets: n, wingFacelets: t, centreFacelets: r } = pn(), o = /* @__PURE__ */ new Map();
  n.forEach((c, a) => {
    c.forEach((u, f) => o.set(u, { slot: a, index: f }));
  });
  const i = /* @__PURE__ */ new Map();
  t.forEach((c, a) => c.forEach((u) => i.set(u, a)));
  const s = /* @__PURE__ */ new Map();
  return r.forEach((c, a) => s.set(c, a)), $t = St(_n).map((c) => {
    const a = ii(e, c, _n), u = new Array(Pe).fill(-1), f = new Array(Pe).fill(-1);
    for (let p = 0; p < Pe; p += 1) {
      const v = o.get(a[n[p][0]]);
      u[p] = v.slot, f[p] = v.index;
      for (let M = 0; M < 3; M += 1) {
        const C = o.get(a[n[p][M]]);
        if (C.slot !== v.slot || C.index !== (M + v.index) % 3)
          throw new Error(`444-state: ${c.face} tore corner ${p} apart`);
      }
    }
    const l = new Array(Z).fill(-1);
    for (let p = 0; p < Z; p += 1) {
      const v = t[p], M = i.get(a[v[0]]);
      if (i.get(a[v[1]]) !== M)
        throw new Error(`444-state: ${c.face} tore wing ${p} apart`);
      l[p] = M;
    }
    const d = new Array(Ie).fill(-1);
    for (let p = 0; p < Ie; p += 1)
      d[p] = s.get(a[r[p]]);
    return { move: c, cornerDestination: u, cornerTwist: f, wingDestination: l, centreDestination: d };
  }), $t;
}
function vm(e, n) {
  const t = new Array(Pe), r = new Array(Pe);
  for (let s = 0; s < Pe; s += 1) {
    const c = n.cornerDestination[s];
    t[c] = e.cornerPermutation[s], r[c] = (e.cornerOrientation[s] + n.cornerTwist[s]) % 3;
  }
  const o = new Array(Z);
  for (let s = 0; s < Z; s += 1)
    o[n.wingDestination[s]] = e.wingPermutation[s];
  const i = new Array(Ie);
  for (let s = 0; s < Ie; s += 1)
    i[n.centreDestination[s]] = e.centreColour[s];
  return { cornerPermutation: t, cornerOrientation: r, wingPermutation: o, centreColour: i };
}
function _e(e, n) {
  const t = Ee();
  return n.reduce((r, o) => vm(r, t[o]), e);
}
function Zu(e) {
  return wm(e, gt);
}
function wm(e, n) {
  return e.cornerPermutation.every((t, r) => t === n.cornerPermutation[r]) && e.cornerOrientation.every((t, r) => t === n.cornerOrientation[r]) && e.wingPermutation.every((t, r) => t === n.wingPermutation[r]) && e.centreColour.every((t, r) => t === n.centreColour[r]);
}
var Qt = 24, ef = (() => {
  var n, t;
  const e = [];
  for (let r = 0; r <= Qt; r += 1) {
    const o = new Array(Qt + 2).fill(0);
    o[0] = 1;
    for (let i = 1; i <= Qt + 1; i += 1)
      o[i] = (((n = e[r - 1]) == null ? void 0 : n[i]) ?? 0) + (((t = e[r - 1]) == null ? void 0 : t[i - 1]) ?? 0);
    e.push(o);
  }
  return e;
})();
function nf(e, n) {
  return ef[e][n];
}
function Sm(e) {
  return nf(Qt, e);
}
function ze(e, n) {
  let t = 0, r = 1;
  for (let o = e; o !== 0; o &= o - 1) {
    const i = 31 - Math.clz32(o & -o);
    t += ef[i][r], r += 1;
  }
  if (r !== n + 1)
    throw new Error(`444-subsets: expected a subset of ${n} slots, got ${r - 1}`);
  return t;
}
function Em(e) {
  const n = new Int32Array(768);
  for (let t = 0; t < 3; t += 1)
    for (let r = 0; r < 256; r += 1) {
      let o = 0;
      for (let i = 0; i < 8; i += 1)
        (r & 1 << i) !== 0 && (o |= 1 << e[t * 8 + i]);
      n[t * 256 + r] = o;
    }
  return n;
}
function ym(e, n) {
  return n[e & 255] | n[256 + (e >>> 8 & 255)] | n[512 + (e >>> 16 & 255)];
}
var tf = 8, kt = Sm(tf);
function On(e) {
  return ze(e, tf);
}
var Xe = [
  [Re.indexOf("U"), Re.indexOf("D")],
  [Re.indexOf("F"), Re.indexOf("B")],
  [Re.indexOf("L"), Re.indexOf("R")]
];
function po(e, n) {
  let t = 0;
  for (let r = 0; r < Ie; r += 1) {
    const o = e.centreColour[r];
    (o === n[0] || o === n[1]) && (t |= 1 << r);
  }
  return t;
}
function No(e) {
  const { centreFace: n } = pn();
  let t = 0;
  for (let r = 0; r < Ie; r += 1) {
    const o = n[r];
    (o === e[0] || o === e[1]) && (t |= 1 << r);
  }
  return t;
}
var dc;
function bm() {
  return dc ?? (dc = Ee().map((e) => Em(e.centreDestination))), dc;
}
function Zt(e, n) {
  return ym(e, bm()[n]);
}
function xm(e) {
  const n = Ee().length, t = new Uint8Array(kt).fill(255), r = new Int32Array(kt), o = No(e);
  t[On(o)] = 0, r[0] = o;
  let i = 1;
  for (let s = 0; s < i; s += 1) {
    const c = r[s], a = t[On(c)] + 1;
    for (let u = 0; u < n; u += 1) {
      const f = Zt(c, u), l = On(f);
      t[l] === 255 && (t[l] = a, r[i] = f, i += 1);
    }
  }
  if (i !== kt)
    throw new Error(
      `444-phase1: the centre subsets are not all reachable (${i} of ${kt})`
    );
  return t;
}
var pc = /* @__PURE__ */ new Map();
function er(e) {
  const n = pc.get(e);
  if (n) return n;
  const t = xm(Xe[e]);
  return pc.set(e, t), t;
}
function Om(e) {
  return {
    upDown: po(e, Xe[0]),
    frontBack: po(e, Xe[1]),
    leftRight: po(e, Xe[2])
  };
}
function Tm(e) {
  return e.upDown === No(Xe[0]) && e.frontBack === No(Xe[1]);
}
function hc(e) {
  return Math.max(
    er(0)[On(e.upDown)],
    er(1)[On(e.frontBack)],
    er(2)[On(e.leftRight)]
  );
}
function qr() {
  return Ee().map((e, n) => ({ table: e, index: n })).filter(({ table: e }) => e.move.depth === 1 || e.move.amount === 2).map(({ index: e }) => e);
}
function Er(e) {
  return Math.floor(e / 2);
}
function rf(e) {
  for (let n = 0; n < Z / 2; n += 1) {
    const t = e.wingPermutation[2 * n], r = e.wingPermutation[2 * n + 1];
    if (Er(t) !== Er(r)) return !1;
  }
  return !0;
}
function Yi(e) {
  const { centreFace: n } = pn();
  for (let t = 0; t < Ie; t += 1)
    if (e.centreColour[t] !== n[t]) return !1;
  return !0;
}
function Mm(e) {
  return Yi(e) && rf(e);
}
var De = nf(8, 4), mc = De ** 3, Bt;
function of() {
  if (Bt) return Bt;
  const { centreFace: e } = pn(), n = Xe.map((o) => {
    const i = [];
    for (let s = 0; s < Ie; s += 1)
      o.includes(e[s]) && i.push(s);
    if (i.length !== 8) throw new Error("444-centres: an axis pair without eight slots");
    return i;
  }), t = Ee(), r = qr().map(
    (o) => n.map((i) => {
      const s = new Int32Array(8);
      for (const [c, a] of i.entries()) {
        const u = i.indexOf(t[o].centreDestination[a]);
        if (u < 0)
          throw new Error("444-centres: a centre-preserving move left its axis pair");
        s[c] = u;
      }
      return s;
    })
  );
  return Bt = { slots: n, destination: r }, Bt;
}
function ho(e, n) {
  const { slots: t } = of(), r = Xe[n][0];
  let o = 0;
  for (const [i, s] of t[n].entries())
    e[s] === r && (o |= 1 << i);
  return o;
}
function sf(e) {
  return ze(ho(e, 0), 4) + De * ze(ho(e, 1), 4) + De ** 2 * ze(ho(e, 2), 4);
}
function Am(e) {
  return sf(e.centreColour);
}
function Rm() {
  return sf(pn().centreFace);
}
var jt;
function mo(e) {
  if (!jt) {
    jt = new Int32Array(De);
    for (let n = 0; n < 256; n += 1) {
      let t = 0;
      for (let r = 0; r < 8; r += 1) (n & 1 << r) !== 0 && (t += 1);
      t === 4 && (jt[ze(n, 4)] = n);
    }
  }
  return jt[e];
}
function go(e, n) {
  let t = 0;
  for (let r = 0; r < 8; r += 1)
    (e & 1 << r) !== 0 && (t |= 1 << n[r]);
  return t;
}
function cf(e, n) {
  const t = of().destination[n], r = e % De, o = Math.floor(e / De) % De, i = Math.floor(e / De ** 2);
  return ze(go(mo(r), t[0]), 4) + De * ze(go(mo(o), t[1]), 4) + De ** 2 * ze(go(mo(i), t[2]), 4);
}
var vo;
function af() {
  if (vo) return vo;
  const e = qr().length, n = new Uint8Array(mc).fill(255), t = new Int32Array(mc), r = Rm();
  n[r] = 0, t[0] = r;
  let o = 1;
  for (let i = 0; i < o; i += 1) {
    const s = t[i], c = n[s] + 1;
    for (let a = 0; a < e; a += 1) {
      const u = cf(s, a);
      n[u] === 255 && (n[u] = c, t[o] = u, o += 1);
    }
  }
  return vo = n, n;
}
function uf(e) {
  const n = qr(), t = af(), r = [];
  let o = Am(e), i = t[o];
  if (i === 255)
    throw new Error("444-centres: this centre coordinate is unreachable — run phase 1 first");
  for (; i > 0; ) {
    let s = !1;
    for (const [c, a] of n.entries()) {
      const u = cf(o, c);
      if (t[u] === i - 1) {
        r.push(a), o = u, i -= 1, s = !0;
        break;
      }
    }
    if (!s) throw new Error("444-centres: exact table with no descending move");
  }
  return r;
}
[
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11]
].map(([e, n]) => [2 * e, 2 * e + 1, 2 * n, 2 * n + 1]);
var wo = 552;
function Pm(e, n) {
  return e * 23 + (n > e ? n - 1 : n);
}
function gc(e) {
  const n = Math.floor(e / 23), t = e % 23;
  return [n, t >= n ? t + 1 : t];
}
var So;
function _m() {
  if (So) return So;
  const e = qr(), n = Ee(), t = new Uint8Array(wo).fill(255), r = new Int32Array(wo);
  let o = 0;
  for (let i = 0; i < wo; i += 1) {
    const [s, c] = gc(i);
    Er(s) === Er(c) && (t[i] = 0, r[o] = i, o += 1);
  }
  for (let i = 0; i < o; i += 1) {
    const s = r[i], [c, a] = gc(s), u = t[s] + 1;
    for (const f of e) {
      const l = Pm(
        n[f].wingDestination[c],
        n[f].wingDestination[a]
      );
      t[l] === 255 && (t[l] = u, r[o] = l, o += 1);
    }
  }
  return So = t, t;
}
function Cm(e) {
  const n = [];
  let t = !1;
  for (const r of e) {
    const o = st(r), i = cn(r);
    let s = !1;
    for (let c = n.length - 1; c >= 0; c -= 1) {
      const a = n[c];
      if (st(a) !== o) break;
      if (cn(a) !== i) continue;
      const u = (a.amount + r.amount) % 4;
      u === 0 ? n.splice(c, 1) : n[c] = { face: r.face, depth: r.depth, amount: u }, s = !0, t = !0;
      break;
    }
    s || n.push(r);
  }
  return t ? n : void 0;
}
function Um(e) {
  let n = [...e];
  for (; ; ) {
    const t = Cm(n);
    if (!t) return n;
    n = t;
  }
}
function Im(e) {
  const n = je(e, Pe), t = new Array(Pe).fill(0);
  let r = 0;
  for (let s = 0; s < Pe - 1; s += 1) {
    const c = we(e, 3);
    t[s] = c, r += c;
  }
  t[Pe - 1] = (3 - r % 3) % 3;
  const o = je(e, Z), i = pn().centreFace.map((s) => s);
  for (let s = i.length - 1; s > 0; s -= 1) {
    const c = we(e, s + 1);
    [i[s], i[c]] = [i[c], i[s]];
  }
  return { cornerPermutation: n, cornerOrientation: t, wingPermutation: o, centreColour: i };
}
var Vt;
function Fm() {
  if (Vt) return Vt;
  const e = Z / 2, n = Ee(), t = [];
  for (const o of la()) {
    const i = n.findIndex(
      (a) => a.move.depth === 1 && a.move.face === o.face && a.move.amount === o.amount
    );
    if (i < 0) continue;
    const s = _e(gt, [i]), c = da(Fe, [o]);
    for (let a = 0; a < e; a += 1) {
      const u = s.wingPermutation[2 * a], f = Math.floor(u / 2);
      f !== a && t.push([a, f, u % 2 ^ c.edgeOrientation[a]]);
    }
  }
  const r = new Array(e).fill(-1);
  r[0] = 0;
  for (let o = 0; o < e; o += 1) {
    for (const [i, s, c] of t)
      r[i] !== -1 && r[s] === -1 ? r[s] = r[i] ^ c : r[s] !== -1 && r[i] === -1 && (r[i] = r[s] ^ c);
    if (r.every((i) => i !== -1)) break;
  }
  if (r.some((o) => o === -1))
    throw new Error("@cubesmith/scrambler: 4x4x4 flip reference is underdetermined");
  for (const [o, i, s] of t)
    if ((r[o] ^ r[i]) !== s)
      throw new Error("@cubesmith/scrambler: 4x4x4 flip reference is inconsistent");
  return Vt = r, Vt;
}
function mn(e) {
  if (!rf(e) || !Yi(e))
    throw new Error("@cubesmith/scrambler: 4x4x4 hand-off needs a reduced cube");
  const n = Fm(), t = new Array(Z / 2), r = new Array(Z / 2);
  for (let o = 0; o < Z / 2; o += 1) {
    const i = e.wingPermutation[2 * o], s = Math.floor(i / 2);
    t[o] = s, r[o] = i % 2 ^ n[o] ^ n[s];
  }
  return {
    cornerPermutation: [...e.cornerPermutation],
    cornerOrientation: [...e.cornerOrientation],
    edgePermutation: t,
    edgeOrientation: r
  };
}
function yr(e) {
  const n = new Array(e.length).fill(!1);
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    if (n[r]) continue;
    let o = 0;
    for (let i = r; !n[i]; i = e[i])
      n[i] = !0, o += 1;
    t += o - 1;
  }
  return t % 2;
}
function Eo(e) {
  return e.cornerOrientation.reduce((r, o) => r + o, 0) % 3 !== 0 || e.edgeOrientation.reduce((r, o) => r + o, 0) % 2 !== 0 ? !1 : yr(e.cornerPermutation) === yr(e.edgePermutation);
}
function nr(e) {
  const n = e.edgeOrientation.reduce((r, o) => r + o, 0) % 2 !== 0, t = yr(e.cornerPermutation) !== yr(e.edgePermutation);
  return n && t ? "both" : n ? "flip" : t ? "permutation" : "none";
}
function Dm(e) {
  const n = Ee(), t = Array.from({ length: Z }, (r, o) => o);
  for (const r of e)
    for (let o = 0; o < Z; o += 1)
      t[o] = n[r].wingDestination[t[o]];
  return t;
}
function Nm(e) {
  const n = Ee(), { face: t, depth: r, amount: o } = n[e].move, i = o === 2 ? 2 : o === 1 ? 3 : 1, s = n.findIndex(
    (c) => c.move.face === t && c.move.depth === r && c.move.amount === i
  );
  if (s < 0) throw new Error("444-generators: a move without an inverse");
  return s;
}
function Lm(e) {
  for (let n = 0; n < Z; n += 1) {
    const t = n % 2 === 0 ? n + 1 : n - 1;
    if (Math.floor(e[n] / 2) !== Math.floor(e[t] / 2))
      return !1;
  }
  return !0;
}
function ff(e) {
  const n = Ee(), t = gt.centreColour;
  let r = t;
  for (const o of e) {
    const { centreDestination: i } = n[o], s = new Array(r.length);
    for (let c = 0; c < r.length; c += 1)
      s[i[c]] = r[c];
    r = s;
  }
  for (let o = 0; o < r.length; o += 1)
    if (r[o] !== t[o]) return !1;
  return !0;
}
var qt;
function $m(e = 4) {
  if (qt) return qt;
  const n = Ee(), t = n.map((c, a) => ({ table: c, index: a })).filter(({ table: c }) => c.move.depth === 2).map(({ index: c }) => c), r = n.map((c, a) => ({ table: c, index: a })).filter(({ table: c }) => c.move.depth === 1).map(({ index: c }) => c), o = /* @__PURE__ */ new Map(), i = [], s = (c, a, u) => {
    if (i.length > 0) {
      const f = [c, ...i, a], l = Dm(f);
      if (!Lm(l) && ff(f)) {
        let d = 0;
        for (let M = 0; M < Z; M += 1)
          l[M] !== M && (d += 1);
        const p = l.join(","), v = o.get(p);
        (!v || v.moves.length > f.length) && o.set(p, {
          moves: f,
          setup: [c],
          core: [...i],
          wingDestination: l,
          support: d
        });
      }
    }
    if (!(i.length >= e))
      for (const f of r)
        u >= 0 && n[f].move.face === n[u].move.face || (i.push(f), s(c, a, f), i.pop());
  };
  for (const c of t)
    s(c, Nm(c), -1);
  return qt = [...o.values()].sort(
    (c, a) => c.support - a.support || c.moves.length - a.moves.length
  ), qt;
}
var Gt;
function Hi() {
  if (Gt) return Gt;
  const e = $m(4), n = e.filter((r) => r.support === 6), t = /* @__PURE__ */ new Map();
  for (const r of n)
    for (const o of e) {
      const i = new Array(Z);
      let s = 0;
      for (let f = 0; f < Z; f += 1) {
        const l = o.wingDestination[r.wingDestination[f]];
        i[f] = l, l !== f && (s += 1);
      }
      if (s === 0 || s > 4) continue;
      const c = i.join(","), a = [...r.moves, ...o.moves], u = t.get(c);
      u && u.moves.length <= a.length || t.set(c, {
        moves: a,
        setup: r.setup,
        core: r.core,
        wingDestination: i,
        support: s
      });
    }
  return Gt = [...e, ...t.values()].sort(
    (r, o) => r.support - o.support || r.moves.length - o.moves.length
  ), Gt;
}
var vc = (e) => Math.floor(e / 2);
function Tn(e) {
  let n = 0;
  for (let t = 0; t < Z / 2; t += 1)
    vc(e[2 * t]) === vc(e[2 * t + 1]) && (n += 1);
  return n;
}
function km(e) {
  return Tn(e) === Z / 2;
}
function rt(e, n) {
  const t = new Array(Z);
  for (let r = 0; r < Z; r += 1)
    t[n.wingDestination[r]] = e[r];
  return t;
}
var wc = class extends Error {
  constructor(n) {
    super(
      `@cubesmith/scrambler: 4x4x4 pairing stalled with ${n} of 12 edges paired — the greedy step is insufficient even though the library is complete`
    );
    Yn(this, "paired");
    this.name = "PairingStalledError", this.paired = n;
  }
}, Kt;
function Bm() {
  lf();
}
function lf() {
  if (Kt) return Kt;
  const e = Hi(), n = e.length, t = new Uint8Array(n * Z), r = new Uint8Array(n * Z), o = new Uint8Array(n);
  return e.forEach((i, s) => {
    const c = s * Z;
    for (let a = 0; a < Z; a += 1) {
      const u = i.wingDestination[a];
      t[c + a] = u, r[c + u] = a;
    }
    o[s] = i.moves.length;
  }), Kt = { destination: t, source: r, length: o, count: n }, Kt;
}
function jm(e) {
  let n = 0;
  for (let t = 0; t < Z / 2; t += 1)
    e[2 * t] >> 1 === e[2 * t + 1] >> 1 && (n += 1);
  return n;
}
var Sc = 64, Vm = 4;
function qm(e) {
  const n = Hi(), { destination: t, source: r, length: o, count: i } = lf(), s = new Uint8Array(Z);
  for (let d = 0; d < Z; d += 1) s[d] = e.wingPermutation[d];
  let c = [{ wings: s, moves: 0, path: [] }], a;
  const u = Z / 2, f = (d, p) => {
    const v = p * Z, M = new Uint8Array(Z);
    for (let C = 0; C < Z; C += 1)
      M[t[v + C]] = d.wings[C];
    return M;
  };
  for (let d = 0; d < u && c.length > 0; d += 1) {
    const p = Sc * 2, v = [];
    let M = 1 / 0;
    for (const L of c) {
      const R = L.wings, G = jm(R);
      for (let $ = 0; $ < i; $ += 1) {
        const K = $ * Z;
        let ee = 0;
        for (let V = 0; V < u; V += 1) {
          const Y = R[r[K + 2 * V]], ce = R[r[K + 2 * V + 1]];
          Y >> 1 === ce >> 1 && (ee += 1);
        }
        if (ee <= G) continue;
        const Q = L.moves + o[$];
        if (a && Q >= a.moves) continue;
        if (ee === u) {
          a = { wings: f(L, $), moves: Q, path: [...L.path, $] };
          continue;
        }
        const re = Q + (u - ee) * Vm;
        if (v.length >= p && re >= M) continue;
        let j = v.length;
        for (; j > 0 && v[j - 1].score > re; ) j -= 1;
        v.splice(j, 0, { node: L, generator: $, moves: Q, score: re }), v.length > p && v.pop(), M = v[v.length - 1].score;
      }
    }
    if (v.length === 0) break;
    const C = /* @__PURE__ */ new Set();
    c = [];
    for (const L of v) {
      const R = f(L.node, L.generator), G = R.join(",");
      if (!C.has(G) && (C.add(G), c.push({
        wings: R,
        moves: L.moves,
        path: [...L.node.path, L.generator]
      }), c.length >= Sc))
        break;
    }
  }
  if (!a) return;
  const l = [];
  for (const d of a.path) l.push(...n[d].moves);
  return {
    moves: l,
    wingPermutation: [...a.wings],
    steps: a.path.length
  };
}
function df(e, n = 40) {
  return qm(e) ?? Gm(e, n);
}
function Gm(e, n = 40) {
  const t = Hi();
  let r = [...e.wingPermutation];
  const o = [];
  let i = 0;
  for (; !km(r); ) {
    if (i >= n) throw new wc(Tn(r));
    const s = Tn(r);
    let c;
    for (const u of t) {
      const f = Tn(rt(r, u));
      if (!(f <= s) && ((!c || f > c.paired || f === c.paired && u.moves.length < c.generator.moves.length) && (c = { generator: u, paired: f }), f === s + 3))
        break;
    }
    if (c) {
      r = rt(r, c.generator), o.push(...c.generator.moves), i += 1;
      continue;
    }
    const a = Km(t, r, s);
    if (!a) throw new wc(s);
    for (const u of a)
      r = rt(r, u), o.push(...u.moves), i += 1;
  }
  return { moves: o, wingPermutation: r, steps: i };
}
function Km(e, n, t) {
  const r = e.map((o) => ({ generator: o, wings: rt(n, o) })).map((o) => ({ ...o, paired: Tn(o.wings) })).filter((o) => o.paired >= t - 3).sort((o, i) => i.paired - o.paired || o.generator.moves.length - i.generator.moves.length);
  for (const o of r)
    for (const i of e)
      if (Tn(rt(o.wings, i)) > t)
        return [o.generator, i];
}
function Xm(e) {
  let n = e >>> 0;
  return () => {
    n = n + 1831565813 | 0;
    let t = Math.imul(n ^ n >>> 15, 1 | n);
    return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, (t ^ t >>> 14) >>> 0;
  };
}
function Wm(e) {
  let n = 2166136261;
  for (let t = 0; t < e.length; t += 1)
    n ^= e.charCodeAt(t), n = Math.imul(n, 16777619);
  return n >>> 0;
}
function Ym(e) {
  return typeof e == "string" ? Wm(e) : Math.floor(e) >>> 0;
}
function Hm(e) {
  return { nextUint32: Xm(Ym(e)) };
}
function zm() {
  const e = globalThis.crypto;
  return e && typeof e.getRandomValues == "function" ? {
    nextUint32: () => {
      const n = new Uint32Array(1);
      return e.getRandomValues(n), n[0];
    }
  } : {
    nextUint32: () => Math.floor(Math.random() * 4294967296)
  };
}
function pf(e) {
  return e !== void 0 ? Hm(e) : zm();
}
var Ec;
function Jm() {
  return Ec ?? (Ec = Ee().map((e) => ({
    axis: st(e.move),
    layerSet: cn(e.move)
  }))), Ec;
}
function hf(e, n = {}) {
  const t = Om(e), r = n.maxLength ?? 12, o = n.maxSolutions ?? 1, i = n.visit, s = Jm(), c = s.length, a = [], u = [];
  let f = !1;
  const l = (p, v, M, C, L, R) => {
    if (f) return;
    const G = { upDown: p, frontBack: v, leftRight: M }, $ = hc(G);
    if ($ === 0 && Tm(G)) {
      if (C !== L) return;
      i ? i(u) && (f = !0) : (a.push([...u]), a.length >= o && (f = !0));
      return;
    }
    if (!(C + $ > L)) {
      for (let K = 0; K < c; K += 1)
        if (!(R >= 0 && (s[K].layerSet === s[R].layerSet || s[K].axis === s[R].axis && s[K].layerSet < s[R].layerSet)) && (u.push(K), l(
          Zt(p, K),
          Zt(v, K),
          Zt(M, K),
          C + 1,
          L,
          K
        ), u.pop(), f))
          return;
    }
  }, d = hc(t);
  for (let p = d; p <= r && (l(t.upDown, t.frontBack, t.leftRight, 0, p, -1), !(f || a.length >= o)); p += 1)
    ;
  return a;
}
function zi(e) {
  const [n] = hf(e);
  if (!n)
    throw new Error("444-phase1: no solution within the length cap — the tables are wrong");
  return n;
}
function Qm(e) {
  const n = new Array(e.length).fill(!1);
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    if (n[r]) continue;
    let o = 0;
    for (let i = r; !n[i]; i = e[i])
      n[i] = !0, o += 1;
    t += o - 1;
  }
  return t % 2;
}
function mf(e) {
  return Qm(e);
}
var Zm = 48, tr;
function yo(e = 0) {
  tr ?? (tr = gf());
  const n = tr[e];
  if (!n)
    throw new Error(
      `@cubesmith/scrambler: odd-wing gadget ${e} is past the pool of ${tr.length}`
    );
  return n;
}
function eg() {
  tr ?? (tr = gf());
}
function gf() {
  const e = Ee(), n = pf("cubesmith 4x4x4 odd wing gadget"), t = [];
  for (let r = 0; t.length < Zm; r += 1) {
    if (r >= 2e4)
      throw new Error(`@cubesmith/scrambler: only ${t.length} odd-wing gadgets found`);
    const o = Array.from(
      { length: 3 + r % 6 },
      () => we(n, e.length)
    ), i = _e(gt, o), s = zi(i), c = _e(i, s), a = [...o, ...s, ...uf(c)], u = _e(gt, a);
    !Yi(u) || !ff(a) || mf(u.wingPermutation) === 1 && t.push(a);
  }
  return t.map((r, o) => ({ moves: r, discovered: o })).sort((r, o) => r.moves.length - o.moves.length || r.discovered - o.discovered).map((r) => r.moves);
}
function ng(e, n) {
  const t = _e(e, n), r = uf(t), o = _e(t, r), i = df(o), s = _e(o, i.moves);
  if (!Mm(s))
    throw new Error("@cubesmith/scrambler: 4x4x4 reduction did not reduce");
  return {
    moves: [...n, ...r, ...i.moves],
    state: s,
    centreMoves: n.length + r.length,
    pairingMoves: i.moves.length
  };
}
function tg(e) {
  switch (nr(mn(e))) {
    case "none":
      return 0;
    case "permutation":
      return 2;
    default:
      return 1;
  }
}
var rg = 4, og = 2, ig = 3e3;
function sg(e, n) {
  return mf(_e(e, n).wingPermutation) === 0;
}
function cg(e, n) {
  const t = zi(e).length, r = [];
  let o = 0;
  return hf(e, {
    maxLength: t + og,
    visit: (i) => (o += 1, sg(e, i) && r.push([...i]), r.length >= n || o >= ig)
  }), r;
}
function ag(e, n = rg) {
  const t = [...cg(e, n), zi(e)];
  let r;
  for (const o of t) {
    const i = ng(e, o), s = tg(i.state);
    if ((!r || s < r.passes || s === r.passes && i.moves.length < r.reduction.moves.length) && (r = { reduction: i, passes: s }), s === 0) break;
  }
  return r.reduction;
}
var Lo = 8, $o = 6;
function ug(e) {
  return (e + 17) % (Lo * $o);
}
var Mn = class extends Error {
  constructor(e) {
    super(`@cubesmith/scrambler: ${e}`), this.name = "Solve444Error";
  }
};
function fg(e, n) {
  const t = Ee().findIndex(
    (r) => r.move.depth === 1 && r.move.face === e && r.move.amount === n
  );
  if (t < 0) throw new Mn(`no 4x4x4 outer move for ${e}${n}`);
  return t;
}
var yc;
function lg(e) {
  yc ?? (yc = new Map(
    Ee().map((t, r) => [
      `${t.move.face}${t.move.depth}${t.move.amount}`,
      r
    ])
  ));
  const n = yc.get(`${e.face}${e.depth}${e.amount}`);
  if (n === void 0)
    throw new Mn(`no 4x4x4 move for ${e.face} depth ${e.depth} x${e.amount}`);
  return n;
}
function dg(e) {
  const n = Ee();
  return Um(e.map((r) => n[r].move)).map(lg);
}
function pg(e) {
  const n = ag(e), t = [...n.moves];
  let r = n.state;
  for (let s = 0; !Eo(mn(r)); s += 1) {
    if (s >= Lo)
      throw new Mn(
        `4x4x4 parity unresolved after ${Lo} passes (${nr(mn(r))})`
      );
    const c = nr(mn(r)) === "permutation";
    let a;
    for (let u = 0; u < $o; u += 1) {
      const f = s * $o + u, l = c ? [...yo(f), ...yo(ug(f))] : yo(f), d = _e(r, l), p = df(d), v = _e(d, p.moves), M = { moves: [...l, ...p.moves], state: v };
      if (a ?? (a = M), Eo(mn(v))) {
        a = M;
        break;
      }
    }
    t.push(...a.moves), r = a.state;
  }
  const o = mn(r);
  if (!Eo(o))
    throw new Mn(
      `4x4x4 parity fix left the cube unreachable (${nr(o)})`
    );
  for (const s of Ti(o))
    t.push(fg(s.face, s.amount));
  const i = dg(t);
  if (!Zu(_e(e, i)))
    throw new Mn("4x4x4 solution does not solve the cube");
  return i;
}
function vf(e) {
  const n = Ee(), t = n.map((r) => r.move);
  for (let r = 0; r < 64; r += 1) {
    const o = Im(e);
    if (!ti(
      o,
      n.map((s, c) => c),
      (s, c) => _e(s, [c]),
      Zu
    ))
      continue;
    const i = pg(o).map((s) => t[s]);
    return ga(Gd(i));
  }
  throw new Mn("4x4x4 draw never cleared the two-move floor");
}
function wf() {
  Ee(), eg(), Bm(), af();
  for (let e = 0; e < Xe.length; e += 1) er(e);
  _m(), Rr();
}
function hg() {
  Te("444", (e) => vf(e), "random-state", wf);
}
var ko = 4, Jn = (() => {
  const e = lu.find((n) => n.event === "555");
  if (!e) throw new Error("variants: 555 is missing from RANDOM_MOVE_CUBES");
  return e;
})();
function bc(e) {
  return Cn(
    ct,
    () => si(Za(e), e, ct)
  );
}
function mg(e) {
  return Cn(
    ko,
    () => si(vf(e), e, ko)
  );
}
function gg(e) {
  return Cn(
    Jn.size,
    () => si(
      du(e, Jn.size, Jn.length),
      e,
      Jn.size
    )
  );
}
function vg() {
  Te("333oh", (e) => eu(e), "random-state", bo), Te("333bf", bc, "random-state", bo), Te("444bf", mg, "random-state", wg), Te("555bf", gg, "random-moves", Sg), Rd("333mbf", bc, "random-state", bo);
}
function bo() {
  Rr(), _r(ct);
}
function wg() {
  wf(), _r(ko);
}
function Sg() {
  _r(Jn.size);
}
var Sf = class extends Error {
  constructor(n) {
    super(`@cubesmith/scrambler: no scrambler is registered for event "${n}" yet`);
    Yn(this, "event");
    this.name = "UnimplementedEventError", this.event = n;
  }
}, rr = class extends Error {
  constructor(n, t, r) {
    super(`@cubesmith/scrambler: count ${t} is not valid for event "${n}" — ${r}`);
    Yn(this, "event");
    Yn(this, "count");
    this.name = "InvalidScrambleCountError", this.event = n, this.count = t;
  }
}, xc = 100;
function Eg(e, n, t, r, o) {
  if (!n.multiScramble)
    return { event: e, moves: n.scramble(t, r), quality: n.quality };
  const i = [];
  for (let s = 0; s < o; s += 1)
    i.push(n.scramble(t, r));
  return { event: e, moves: i[0], quality: n.quality, scrambles: i };
}
function yg(e, n) {
  if (n === void 0) return 1;
  if (!Number.isInteger(n))
    throw new rr(e, n, "count must be a whole number");
  if (n < 1)
    throw new rr(e, n, "count must be at least 1");
  if (n > xc)
    throw new rr(
      e,
      n,
      `count must be at most ${xc} — every cube is a full random-state solve`
    );
  return n;
}
async function bg(e, n = {}) {
  const t = ua(e);
  if (!t)
    throw new Sf(e);
  const r = pf(n.seed);
  if (!t.multiScramble && n.count !== void 0)
    throw new rr(
      e,
      n.count,
      "the event is a single scramble, so count does not apply"
    );
  return Eg(
    e,
    t,
    r,
    n,
    t.multiScramble ? yg(e, n.count) : 1
  );
}
async function xg(e) {
  var t;
  const n = ua(e);
  if (!n)
    throw new Sf(e);
  (t = n.prepare) == null || t.call(n);
}
var Og = {
  minx: "megaminx",
  clock: "clock",
  pyram: "pyraminx",
  skewb: "skewb",
  sq1: "square1"
};
new Set(
  Object.keys(Og)
);
Fd();
Hp();
t0();
Vh();
M1();
_0();
eh();
rh();
dm();
hg();
vg();
async function Ng() {
  await xg("444");
}
async function Tg(e = {}) {
  if (e.randomWord !== void 0)
    throw new TypeError(
      "The 4x4 backend does not support randomWord injection; use seed for reproducible tests"
    );
  const n = e.seed === void 0 ? {} : { seed: e.seed }, t = performance.now(), r = await bg(
    "444",
    n
  ), o = performance.now(), i = r.moves.trim(), s = i.split(/\s+/), c = performance.now(), a = Yl($c(), s), u = performance.now();
  if (console.log({
    backendMs: Math.round(o - t),
    replayMs: Math.round(u - c)
  }), jl(a))
    throw new Error("The 4x4 backend returned a solved scramble state");
  return {
    event: "444",
    notation: i,
    moves: s,
    state: a,
    method: r.quality,
    backend: "@cubesmith/scrambler"
  };
}
const Oc = [-1, 0, 1];
function Ef(e, n) {
  return `${e.join(",")}|${n.join(",")}`;
}
function Mg() {
  const e = [];
  for (const n of ur) {
    const t = $e.find(
      (r) => r.face === n
    ).normal;
    for (let r = 0; r < 3; r++)
      for (let o = 0; o < 3; o++) {
        const i = Oc[r], s = Oc[o];
        let c;
        switch (n) {
          case "U":
            c = [s, 1, i];
            break;
          case "R":
            c = [1, -i, -s];
            break;
          case "F":
            c = [s, -i, 1];
            break;
          case "D":
            c = [s, -1, -i];
            break;
          case "L":
            c = [-1, -i, s];
            break;
          case "B":
            c = [-s, -i, -1];
            break;
        }
        e.push({
          face: n,
          position: c,
          normal: t,
          key: Ef(c, t)
        });
      }
  }
  return e;
}
const or = Mg(), Ag = new Map(
  or.map((e, n) => [e.key, n])
);
function Rg(e) {
  return e === -3 ? -1 : e === 3 ? 1 : 0;
}
function Pg(e) {
  Bc(e);
  const n = or.map(() => []);
  for (let r = 0; r < $e.length; r++) {
    const o = $e[r], i = o.position.map(Rg), s = Ef(i, o.normal), c = Ag.get(s);
    if (c === void 0)
      throw new Error("Could not map a 4x4 sticker to the 3x3 layout");
    n[c].push(e[r]);
  }
  const t = [];
  for (let r = 0; r < or.length; r++) {
    const o = or[r], i = n[r];
    if (i.length === 0)
      throw new Error(`Missing stickers for reduced ${o.face} facelet`);
    const s = i[0];
    if (!i.every((a) => a === s))
      throw new Error(
        `4x4 is not reduced: stickers disagree at ${o.face} facelet ${o.position.join(",")}`
      );
    if (o.position.filter(
      (a) => a === 0
    ).length === 2 && s !== o.face)
      throw new Error(
        `4x4 centres are not solved: expected ${o.face}, got ${s}`
      );
    t.push(s);
  }
  return t.join("");
}
function Lg() {
  return Pg($c());
}
function _g(e) {
  if (typeof e != "string" || !/^[a-z0-9]+$/.test(e))
    throw new TypeError(
      "Event ID must be a non-empty lowercase alphanumeric string"
    );
}
function Cg(e) {
  if (typeof e != "function")
    throw new TypeError("Event generator must be a function");
}
function Ug() {
  const e = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(n, t) {
      if (_g(n), Cg(t), e.has(n))
        throw new RangeError(`Event "${n}" is already registered`);
      e.set(n, t);
    },
    get(n) {
      return e.get(n);
    },
    list() {
      return Object.freeze([...e.keys()]);
    }
  });
}
const Bo = Ug();
let yf = Object.freeze([]);
function Gr(e, n) {
  Bo.register(e, n), yf = Bo.list();
}
function Ig(e) {
  return Bo.get(e);
}
Gr(
  "333",
  ({ randomWord: e } = {}) => Vf(e)
);
Gr(
  "222",
  ({ randomWord: e } = {}) => ml(e)
);
Gr(
  "pyram",
  ({ randomWord: e } = {}) => Dl(e)
);
Gr(
  "444",
  (e = {}) => Tg(e)
);
async function $g(e = "333", n = {}) {
  if (!n || typeof n != "object" || Array.isArray(n))
    throw new TypeError("options must be an object");
  if (n.randomWord !== void 0 && typeof n.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  const t = Ig(e);
  if (!t)
    throw new RangeError(
      `Unsupported event "${e}". Supported events: ${yf.join(", ")}`
    );
  return await t(n);
}
export {
  yf as events,
  $g as generate,
  jl as isSolved444State,
  kc as isValid444State,
  Ng as prepare444Scrambler,
  Gr as registerEvent,
  $c as solved444State,
  Lg as solvedReduced3x3Facelets,
  Pg as toReduced3x3Facelets
};
