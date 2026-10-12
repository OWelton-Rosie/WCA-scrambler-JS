function Dt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ie = { exports: {} }, bt = Ie.exports, ot;
function ht() {
  return ot || (ot = 1, (function(e) {
    (function() {
      var r, n, t, y, E, O, C, z, _, G, j, X, W, he, Q, V, Z, J, $, re, se, ne, oe, ue, fe, le, ae, de, Ce, ge, pe, me, we;
      [$, J, he, E, Z, r] = [0, 1, 2, 3, 4, 5], [ae, oe, fe, se, _, j, C, W] = [0, 1, 2, 3, 4, 5, 6, 7], [le, ne, ue, re, X, z, G, O, V, Q, n, t] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [Ce, pe, we] = (function() {
        var K, H, Y, B, k, m;
        return m = function(h) {
          return h - 1;
        }, k = function(h) {
          return m(9) + h;
        }, Y = function(h) {
          return k(9) + h;
        }, H = function(h) {
          return Y(9) + h;
        }, B = function(h) {
          return H(9) + h;
        }, K = function(h) {
          return B(9) + h;
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
              m(9),
              k(1),
              Y(3)
            ],
            [
              m(7),
              Y(1),
              B(3)
            ],
            [
              m(1),
              B(1),
              K(3)
            ],
            [
              m(3),
              K(1),
              k(3)
            ],
            [
              H(3),
              Y(9),
              k(7)
            ],
            [
              H(1),
              B(9),
              Y(7)
            ],
            [
              H(7),
              K(9),
              B(7)
            ],
            [
              H(9),
              k(9),
              K(7)
            ]
          ],
          // Edges
          [
            [
              m(6),
              k(2)
            ],
            [
              m(8),
              Y(2)
            ],
            [
              m(4),
              B(2)
            ],
            [
              m(2),
              K(2)
            ],
            [
              H(6),
              k(8)
            ],
            [
              H(2),
              Y(8)
            ],
            [
              H(4),
              B(8)
            ],
            [
              H(8),
              K(8)
            ],
            [
              Y(6),
              k(4)
            ],
            [
              Y(4),
              B(6)
            ],
            [
              K(6),
              B(4)
            ],
            [
              K(4),
              k(6)
            ]
          ]
        ];
      })(), de = ["U", "R", "F", "D", "L", "B"], ge = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], me = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], y = (function() {
        var K, H, Y;
        class B {
          constructor(m) {
            m != null ? this.init(m) : this.identity(), this.newCenter = (function() {
              var h, a;
              for (a = [], h = 0; h <= 5; ++h)
                a.push(0);
              return a;
            })(), this.newCp = (function() {
              var h, a;
              for (a = [], h = 0; h <= 7; ++h)
                a.push(0);
              return a;
            })(), this.newEp = (function() {
              var h, a;
              for (a = [], h = 0; h <= 11; ++h)
                a.push(0);
              return a;
            })(), this.newCo = (function() {
              var h, a;
              for (a = [], h = 0; h <= 7; ++h)
                a.push(0);
              return a;
            })(), this.newEo = (function() {
              var h, a;
              for (a = [], h = 0; h <= 11; ++h)
                a.push(0);
              return a;
            })();
          }
          init(m) {
            return this.center = m.center.slice(0), this.co = m.co.slice(0), this.ep = m.ep.slice(0), this.cp = m.cp.slice(0), this.eo = m.eo.slice(0);
          }
          identity() {
            return this.center = [0, 1, 2, 3, 4, 5], this.cp = [0, 1, 2, 3, 4, 5, 6, 7], this.co = (function() {
              var m, h;
              for (h = [], m = 0; m <= 7; ++m)
                h.push(0);
              return h;
            })(), this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.eo = (function() {
              var m, h;
              for (h = [], m = 0; m <= 11; ++m)
                h.push(0);
              return h;
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
            var m, h, a, w, g, R, M, T, U, S, N;
            for (N = [], a = w = 0; w <= 5; a = ++w)
              N[9 * a + 4] = de[this.center[a]];
            for (a = g = 0; g <= 7; a = ++g)
              for (m = this.cp[a], U = this.co[a], M = R = 0; R <= 2; M = ++R)
                N[pe[a][(M + U) % 3]] = ge[m][M];
            for (a = T = 0; T <= 11; a = ++T)
              for (h = this.ep[a], U = this.eo[a], M = S = 0; S <= 1; M = ++S)
                N[we[a][(M + U) % 2]] = me[h][M];
            return N.join("");
          }
          static fromString(m) {
            var h, a, w, g, R, M, T, U, S, N, I, ee, te, o;
            for (w = new B(), g = M = 0; M <= 5; g = ++M)
              for (R = T = 0; T <= 5; R = ++T)
                m[9 * g + 4] === de[R] && (w.center[g] = R);
            for (g = U = 0; U <= 7; g = ++U) {
              for (N = S = 0; S <= 2 && !((o = m[pe[g][N]]) === "U" || o === "D"); N = ++S)
                ;
              for (h = m[pe[g][(N + 1) % 3]], a = m[pe[g][(N + 2) % 3]], R = I = 0; I <= 7; R = ++I)
                h === ge[R][1] && a === ge[R][2] && (w.cp[g] = R, w.co[g] = N % 3);
            }
            for (g = ee = 0; ee <= 11; g = ++ee)
              for (R = te = 0; te <= 11; R = ++te) {
                if (m[we[g][0]] === me[R][0] && m[we[g][1]] === me[R][1]) {
                  w.ep[g] = R, w.eo[g] = 0;
                  break;
                }
                if (m[we[g][0]] === me[R][1] && m[we[g][1]] === me[R][0]) {
                  w.ep[g] = R, w.eo[g] = 1;
                  break;
                }
              }
            return w;
          }
          clone() {
            return new B(this.toJSON());
          }
          // A class method returning a new random cube
          static random() {
            return new B().randomize();
          }
          isSolved() {
            var m, h, a, w, g, R, M;
            for (a = this.clone(), a.move(a.upright()), h = g = 0; g <= 5; h = ++g)
              if (a.center[h] !== h)
                return !1;
            for (m = R = 0; R <= 7; m = ++R)
              if (a.cp[m] !== m || a.co[m] !== 0)
                return !1;
            for (w = M = 0; M <= 11; w = ++M)
              if (a.ep[w] !== w || a.eo[w] !== 0)
                return !1;
            return !0;
          }
          // Multiply this Cube with another Cube, restricted to centers.
          centerMultiply(m) {
            var h, a, w;
            for (w = a = 0; a <= 5; w = ++a)
              h = m.center[w], this.newCenter[w] = this.center[h];
            return [this.center, this.newCenter] = [this.newCenter, this.center], this;
          }
          // Multiply this Cube with another Cube, restricted to corners.
          cornerMultiply(m) {
            var h, a, w;
            for (w = a = 0; a <= 7; w = ++a)
              h = m.cp[w], this.newCp[w] = this.cp[h], this.newCo[w] = (this.co[h] + m.co[w]) % 3;
            return [this.cp, this.newCp] = [this.newCp, this.cp], [this.co, this.newCo] = [this.newCo, this.co], this;
          }
          // Multiply this Cube with another Cube, restricted to edges
          edgeMultiply(m) {
            var h, a, w;
            for (w = a = 0; a <= 11; w = ++a)
              h = m.ep[w], this.newEp[w] = this.ep[h], this.newEo[w] = (this.eo[h] + m.eo[w]) % 2;
            return [this.ep, this.newEp] = [this.newEp, this.ep], [this.eo, this.newEo] = [this.newEo, this.eo], this;
          }
          // Multiply this cube with another Cube
          multiply(m) {
            return this.centerMultiply(m), this.cornerMultiply(m), this.edgeMultiply(m), this;
          }
          move(m) {
            var h, a, w, g, R, M, T, U;
            for (T = Y(m), a = 0, g = T.length; a < g; a++)
              for (R = T[a], h = R / 3 | 0, M = R % 3, w = 0, U = M; 0 <= U ? w <= U : w >= U; 0 <= U ? ++w : --w)
                this.multiply(B.moves[h]);
            return this;
          }
          upright() {
            var m, h, a, w, g, R;
            for (m = this.clone(), R = [], h = w = 0; w <= 5 && m.center[h] !== he; h = ++w)
              ;
            switch (h) {
              case E:
                R.push("x");
                break;
              case $:
                R.push("x'");
                break;
              case r:
                R.push("x2");
                break;
              case J:
                R.push("y");
                break;
              case Z:
                R.push("y'");
            }
            for (R.length && m.move(R[0]), a = g = 0; g <= 5 && m.center[a] !== $; a = ++g)
              ;
            switch (a) {
              case Z:
                R.push("z");
                break;
              case J:
                R.push("z'");
                break;
              case E:
                R.push("z2");
            }
            return R.join(" ");
          }
          static inverse(m) {
            var h, a, w, g, R, M, T;
            if (M = (function() {
              var U, S, N, I;
              for (N = Y(m), I = [], U = 0, S = N.length; U < S; U++)
                g = N[U], h = g / 3 | 0, R = g % 3, I.push(h * 3 + -(R - 1) + 1);
              return I;
            })(), M.reverse(), typeof m == "string") {
              for (T = "", a = 0, w = M.length; a < w; a++)
                g = M[a], h = g / 3 | 0, R = g % 3, T += K[h], R === 1 ? T += "2" : R === 2 && (T += "'"), T += " ";
              return T.substring(0, T.length - 1);
            } else return m.length != null ? M : M[0];
          }
        }
        return B.prototype.randomize = (function() {
          var k, m, h, a, w, g, R, M, T;
          return g = function(U, S) {
            return U + Math.floor(Math.random() * (S - U + 1));
          }, T = function(U) {
            var S, N;
            for (S = U.length; S !== 0; )
              N = g(0, S - 1), S -= 1, U[S], [U[S], U[N]] = [U[N], U[S]];
          }, a = function(U) {
            var S, N, I, ee, te, o, s;
            for (te = 0, s = (function() {
              var u, f, i;
              for (i = [], u = 0, f = U.length - 1; 0 <= f ? u <= f : u >= f; 0 <= f ? ++u : --u)
                i.push(!1);
              return i;
            })(); ; ) {
              for (S = -1, I = ee = 0, o = U.length - 1; 0 <= o ? ee <= o : ee >= o; I = 0 <= o ? ++ee : --ee)
                if (!s[I]) {
                  S = I;
                  break;
                }
              if (S === -1)
                break;
              for (N = 0; !s[S]; )
                s[S] = !0, N++, S = U[S];
              te += N + 1;
            }
            return te;
          }, k = function(U, S) {
            var N;
            return N = a(S) + a(U), N % 2 === 0;
          }, h = function(U, S) {
            for (T(S), T(U); !k(U, S); )
              T(S), T(U);
          }, R = function(U, S) {
            var N, I, ee, te;
            for (ee = 0, N = I = 0, te = U.length - 1; 0 <= te ? I <= te : I >= te; N = 0 <= te ? ++I : --I)
              ee += U[N] = g(0, S - 1);
          }, w = function(U, S) {
            return U.reduce(function(N, I) {
              return N + I;
            }) % S === 0;
          }, m = function(U, S) {
            for (R(U, 3); !w(U, 3); )
              R(U, 3);
            for (R(S, 2); !w(S, 2); )
              R(S, 2);
          }, M = function() {
            return h(this.cp, this.ep), m(this.co, this.eo), this;
          }, M;
        })(), B.moves = [
          {
            // U
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              se,
              ae,
              oe,
              fe,
              _,
              j,
              C,
              W
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
              le,
              ne,
              ue,
              X,
              z,
              G,
              O,
              V,
              Q,
              n,
              t
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
              _,
              oe,
              fe,
              ae,
              W,
              j,
              C,
              se
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
              V,
              ne,
              ue,
              re,
              t,
              z,
              G,
              O,
              X,
              Q,
              n,
              le
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
              oe,
              j,
              fe,
              se,
              ae,
              _,
              C,
              W
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
              le,
              Q,
              ue,
              re,
              X,
              V,
              G,
              O,
              ne,
              z,
              n,
              t
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
              ae,
              oe,
              fe,
              se,
              j,
              C,
              W,
              _
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
              le,
              ne,
              ue,
              re,
              z,
              G,
              O,
              X,
              V,
              Q,
              n,
              t
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
              ae,
              fe,
              C,
              se,
              _,
              oe,
              j,
              W
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
              le,
              ne,
              n,
              re,
              X,
              z,
              Q,
              O,
              V,
              ue,
              G,
              t
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
              ae,
              oe,
              se,
              W,
              _,
              j,
              fe,
              C
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
              le,
              ne,
              ue,
              t,
              X,
              z,
              G,
              n,
              V,
              Q,
              re,
              O
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
              $,
              he,
              Z,
              E,
              r,
              J
            ],
            cp: [
              ae,
              oe,
              fe,
              se,
              _,
              j,
              C,
              W
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
              le,
              ne,
              ue,
              re,
              X,
              z,
              G,
              O,
              Q,
              n,
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
              1,
              1,
              1,
              1
            ]
          },
          {
            // M
            center: [
              r,
              J,
              $,
              he,
              Z,
              E
            ],
            cp: [
              ae,
              oe,
              fe,
              se,
              _,
              j,
              C,
              W
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
              le,
              re,
              ue,
              O,
              X,
              ne,
              G,
              z,
              V,
              Q,
              n,
              t
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
              Z,
              $,
              he,
              J,
              E,
              r
            ],
            cp: [
              ae,
              oe,
              fe,
              se,
              _,
              j,
              C,
              W
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
              ue,
              ne,
              G,
              re,
              le,
              z,
              X,
              O,
              V,
              Q,
              n,
              t
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
        ], H = {
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
        }, K = {
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
        }, Y = function(k) {
          var m, h, a, w, g, R, M;
          if (typeof k == "string") {
            for (R = k.split(/\s+/), M = [], m = 0, h = R.length; m < h; m++)
              if (w = R[m], w.length !== 0) {
                if (w.length > 2)
                  throw new Error(`Invalid move: ${w}`);
                if (a = H[w[0]], a === void 0)
                  throw new Error(`Invalid move: ${w}`);
                if (w.length === 1)
                  g = 0;
                else if (w[1] === "2")
                  g = 1;
                else if (w[1] === "'")
                  g = 2;
                else
                  throw new Error(`Invalid move: ${w}`);
                M.push(a * 3 + g);
              }
            return M;
          } else return k.length != null ? k : [k];
        }, B.moves.push(new B().move("R M' L'").toJSON()), B.moves.push(new B().move("U E' D'").toJSON()), B.moves.push(new B().move("F S B'").toJSON()), B.moves.push(new B().move("U E'").toJSON()), B.moves.push(new B().move("R M'").toJSON()), B.moves.push(new B().move("F S").toJSON()), B.moves.push(new B().move("D E").toJSON()), B.moves.push(new B().move("L M").toJSON()), B.moves.push(new B().move("B S'").toJSON()), B;
      }).call(this), e !== null ? e.exports = y : this.Cube = y;
    }).call(bt);
  })(Ie)), Ie.exports;
}
var Ve = {}, it;
function St() {
  return it || (it = 1, (function() {
    var e, r, n, t, y, E, O, C, z, _, G, j, X, W, he, Q, V, Z, J, $, re, se, ne, oe, ue, fe, le, ae, de, Ce, ge, pe, me, we, K, H, Y, B, k, m, h, a, w, g, R, M, T, U, S, N, I, ee, te = [].indexOf;
    t = this.Cube || ht(), [me, de, ge, le, C, _, E, j] = [0, 1, 2, 3, 4, 5, 6, 7], [pe, ae, Ce, fe, G, O, z, y, W, X, e, r] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], n = function(o, s) {
      var u, f, i;
      if (o < s)
        return 0;
      for (s > o / 2 && (s = o - s), i = 1, u = o, f = 1; u !== o - s; )
        i *= u, i /= f, u--, f++;
      return i;
    }, m = function(o) {
      var s, u, f, i;
      for (s = 1, u = f = 2, i = o; 2 <= i ? f <= i : f >= i; u = 2 <= i ? ++f : --f)
        s *= u;
      return s;
    }, a = function(o, s) {
      return o > s ? o : s;
    }, N = function(o, s, u) {
      var f, i, l, v, F;
      for (F = o[s], f = i = l = s, v = u - 1; l <= v ? i <= v : i >= v; f = l <= v ? ++i : --i)
        o[f] = o[f + 1];
      return o[u] = F;
    }, I = function(o, s, u) {
      var f, i, l, v, F;
      for (F = o[u], f = i = l = u, v = s + 1; l <= v ? i <= v : i >= v; f = l <= v ? ++i : --i)
        o[f] = o[f - 1];
      return o[s] = F;
    }, T = function(o, s, u, f = !1) {
      var i, l, v, F, D, A;
      return F = u - s, v = m(F + 1), o === "corners" ? (l = 7, A = "cp") : (l = 11, A = "ep"), D = (function() {
        var b, c, p;
        for (p = [], i = b = 0, c = F; 0 <= c ? b <= c : b >= c; i = 0 <= c ? ++b : --b)
          p.push(0);
        return p;
      })(), function(b) {
        var c, p, L, d, x, P, q, ce, Re, Ue, ye, De, je, be, Se, $e, Le, _e, rt, Ee, nt, Be, Me, Ne, ie, Oe, Te;
        if (b != null) {
          for (i = P = 0, ye = F; 0 <= ye ? P <= ye : P >= ye; i = 0 <= ye ? ++P : --P)
            D[i] = i + s;
          for (p = b % v, c = b / v | 0, Re = this[A], i = q = 0, De = l; 0 <= De ? q <= De : q >= De; i = 0 <= De ? ++q : --q)
            Re[i] = -1;
          for (d = ce = 1, be = F; 1 <= be ? ce <= be : ce >= be; d = 1 <= be ? ++ce : --ce)
            for (x = p % (d + 1), p = p / (d + 1) | 0; x > 0; )
              I(D, 0, d), x--;
          if (ie = F, f)
            for (d = Ue = 0, Se = l; 0 <= Se ? Ue <= Se : Ue >= Se; d = 0 <= Se ? ++Ue : --Ue)
              L = n(l - d, ie + 1), c - L >= 0 && (Re[d] = D[F - ie], c -= L, ie--);
          else
            for (d = Be = $e = l; $e <= 0 ? Be <= 0 : Be >= 0; d = $e <= 0 ? ++Be : --Be)
              L = n(d, ie + 1), c - L >= 0 && (Re[d] = D[ie], c -= L, ie--);
          return this;
        } else {
          for (Re = this[A], i = Me = 0, Le = F; 0 <= Le ? Me <= Le : Me >= Le; i = 0 <= Le ? ++Me : --Me)
            D[i] = -1;
          if (c = p = ie = 0, f)
            for (d = Ne = _e = l; _e <= 0 ? Ne <= 0 : Ne >= 0; d = _e <= 0 ? ++Ne : --Ne)
              s <= (rt = Re[d]) && rt <= u && (c += n(l - d, ie + 1), D[F - ie] = Re[d], ie++);
          else
            for (d = Oe = 0, Ee = l; 0 <= Ee ? Oe <= Ee : Oe >= Ee; d = 0 <= Ee ? ++Oe : --Oe)
              s <= (nt = Re[d]) && nt <= u && (c += n(d, ie + 1), D[ie] = Re[d], ie++);
          for (d = Te = je = F; je <= 0 ? Te <= 0 : Te >= 0; d = je <= 0 ? ++Te : --Te) {
            for (x = 0; D[d] !== s + d; )
              N(D, 0, d), x++;
            p = (d + 1) * p + x;
          }
          return c * v + p;
        }
      };
    }, he = {
      // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
      // the DRB corner is fully determined by the orientation of the other
      // corners.
      twist: function(o) {
        var s, u, f, i, l, v;
        if (o != null) {
          for (l = 0, s = u = 6; u >= 0; s = --u)
            i = o % 3, o = o / 3 | 0, this.co[s] = i, l += i;
          return this.co[7] = (3 - l % 3) % 3, this;
        } else {
          for (v = 0, s = f = 0; f <= 6; s = ++f)
            v = 3 * v + this.co[s];
          return v;
        }
      },
      // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
      // BR edge is fully determined by the orientation of the other edges.
      flip: function(o) {
        var s, u, f, i, l, v;
        if (o != null) {
          for (l = 0, s = u = 10; u >= 0; s = --u)
            i = o % 2, o = o / 2 | 0, this.eo[s] = i, l += i;
          return this.eo[11] = (2 - l % 2) % 2, this;
        } else {
          for (v = 0, s = f = 0; f <= 10; s = ++f)
            v = 2 * v + this.eo[s];
          return v;
        }
      },
      // Parity of the corner permutation
      cornerParity: function() {
        var o, s, u, f, i, l, v, F, D;
        for (D = 0, o = u = i = j, l = me + 1; i <= l ? u <= l : u >= l; o = i <= l ? ++u : --u)
          for (s = f = v = o - 1, F = me; v <= F ? f <= F : f >= F; s = v <= F ? ++f : --f)
            this.cp[s] > this.cp[o] && D++;
        return D % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var o, s, u, f, i, l, v, F, D;
        for (D = 0, o = u = i = r, l = pe + 1; i <= l ? u <= l : u >= l; o = i <= l ? ++u : --u)
          for (s = f = v = o - 1, F = pe; v <= F ? f <= F : f >= F; s = v <= F ? ++f : --f)
            this.ep[s] > this.ep[o] && D++;
        return D % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: T("corners", me, _),
      // Permutation of the three edges UR, UF, UL
      URtoUL: T("edges", pe, Ce),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: T("edges", fe, O),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: T("edges", pe, O),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: T("edges", W, r, !0)
    };
    for (h in he)
      ee = he[h], t.prototype[h] = ee;
    H = function(o, s, u) {
      var f, i, l, v, F, D, A, b, c, p, L;
      for (f = o === "corners" ? "cornerMultiply" : "edgeMultiply", i = new t(), L = [], l = D = 0, p = u - 1; 0 <= p ? D <= p : D >= p; l = 0 <= p ? ++D : --D) {
        for (i[s](l), v = [], F = b = 0; b <= 5; F = ++b) {
          for (A = t.moves[F], c = 0; c <= 2; ++c)
            i[f](A), v.push(i[s]());
          i[f](A);
        }
        L.push(v);
      }
      return L;
    }, w = (function() {
      var o, s;
      return o = new t(), s = new t(), function(u, f) {
        var i, l;
        for (o.URtoUL(u), s.UBtoDF(f), i = l = 0; l <= 7; i = ++l)
          if (o.ep[i] !== -1) {
            if (s.ep[i] !== -1)
              return -1;
            s.ep[i] = o.ep[i];
          }
        return s.URtoDF();
      };
    })(), re = 2187, Q = 2048, Z = 2, V = 11880, J = 495, $ = 24, ne = 20160, oe = 20160, ue = 1320, se = 1320, t.moveTables = {
      parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
      twist: null,
      flip: null,
      FRtoBR: null,
      URFtoDLF: null,
      URtoDF: null,
      URtoUL: null,
      UBtoDF: null,
      mergeURtoDF: null
    }, g = {
      // name: [scope, size]
      twist: ["corners", re],
      flip: ["edges", Q],
      FRtoBR: ["edges", V],
      URFtoDLF: ["corners", ne],
      URtoDF: ["edges", oe],
      URtoUL: ["edges", ue],
      UBtoDF: ["edges", se],
      mergeURtoDF: []
    }, t.computeMoveTables = function(...o) {
      var s, u, f, i, l, v;
      for (o.length === 0 && (o = (function() {
        var F;
        F = [];
        for (f in g)
          F.push(f);
        return F;
      })()), u = 0, s = o.length; u < s; u++)
        v = o[u], this.moveTables[v] === null && (v === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var F, D, A, b;
          for (b = [], D = A = 0; A <= 335; D = ++A)
            b.push((function() {
              var c, p;
              for (p = [], F = c = 0; c <= 335; F = ++c)
                p.push(w(D, F));
              return p;
            })());
          return b;
        })() : ([i, l] = g[v], this.moveTables[v] = H(i, v, l)));
      return this;
    }, we = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], R = (function() {
      var o, s, u, f, i, l, v, F;
      for (F = [], s = u = 0; u <= 5; s = ++u) {
        for (f = [], o = i = 0; i <= 5; o = ++i)
          if (o !== s && o !== s - 3)
            for (v = l = 0; l <= 2; v = ++l)
              f.push(o * 3 + v);
        F.push(f);
      }
      return F;
    })(), K = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], M = (function() {
      var o, s, u, f, i, l, v, F, D, A;
      for (A = [], s = f = 0; f <= 5; s = ++f) {
        for (i = [], o = l = 0; l <= 5; o = ++l)
          if (o !== s && o !== s - 3)
            for (D = o === 0 || o === 3 ? [0, 1, 2] : [1], v = 0, u = D.length; v < u; v++)
              F = D[v], i.push(o * 3 + F);
        A.push(i);
      }
      return A;
    })(), U = function(o, s, u) {
      var f, i, l;
      return f = s % 8, l = s >> 3, i = f << 2, u != null ? (o[l] &= ~(15 << i), o[l] |= u << i, u) : (o[l] & 15 << i) >>> i;
    }, Y = function(o, s, u, f) {
      var i, l, v, F, D, A, b, c, p, L, d, x;
      for (x = (function() {
        var P, q, ce;
        for (ce = [], P = 0, q = Math.ceil(s / 8) - 1; 0 <= q ? P <= q : P >= q; 0 <= q ? ++P : --P)
          ce.push(4294967295);
        return ce;
      })(), o === 1 ? c = we : c = K, l = 0, U(x, 0, l), v = 1; v !== s; ) {
        for (F = A = 0, d = s - 1; 0 <= d ? A <= d : A >= d; F = 0 <= d ? ++A : --A)
          if (U(x, F) === l)
            for (i = u(F), L = 0, D = c.length; L < D; L++)
              b = c[L], p = f(i, b), U(x, p) === 15 && (U(x, p, l + 1), v++);
        l++;
      }
      return x;
    }, t.pruningTables = {
      sliceTwist: null,
      sliceFlip: null,
      sliceURFtoDLFParity: null,
      sliceURtoDFParity: null
    }, S = {
      // name: [phase, size, currentCoords, nextIndex]
      sliceTwist: [
        1,
        J * re,
        function(o) {
          return [
            o % J,
            o / J | 0
          ];
        },
        function(o, s) {
          var u, f, i, l;
          return [
            i,
            l
          ] = o, u = t.moveTables.FRtoBR[i * 24][s] / 24 | 0, f = t.moveTables.twist[l][s], f * J + u;
        }
      ],
      sliceFlip: [
        1,
        J * Q,
        function(o) {
          return [
            o % J,
            o / J | 0
          ];
        },
        function(o, s) {
          var u, f, i, l;
          return [
            l,
            u
          ] = o, i = t.moveTables.FRtoBR[l * 24][s] / 24 | 0, f = t.moveTables.flip[u][s], f * J + i;
        }
      ],
      sliceURFtoDLFParity: [
        2,
        $ * ne * Z,
        function(o) {
          return [
            o % 2,
            (o / 2 | 0) % $,
            (o / 2 | 0) / $ | 0
          ];
        },
        function(o, s) {
          var u, f, i, l, v, F;
          return [
            v,
            F,
            u
          ] = o, f = t.moveTables.parity[v][s], i = t.moveTables.FRtoBR[F][s], l = t.moveTables.URFtoDLF[u][s], (l * $ + i) * 2 + f;
        }
      ],
      sliceURtoDFParity: [
        2,
        $ * oe * Z,
        function(o) {
          return [
            o % 2,
            (o / 2 | 0) % $,
            (o / 2 | 0) / $ | 0
          ];
        },
        function(o, s) {
          var u, f, i, l, v, F;
          return [
            v,
            F,
            u
          ] = o, f = t.moveTables.parity[v][s], i = t.moveTables.FRtoBR[F][s], l = t.moveTables.URtoDF[u][s], (l * $ + i) * 2 + f;
        }
      ]
    }, t.computePruningTables = function(...o) {
      var s, u, f, i, l;
      for (o.length === 0 && (o = (function() {
        var v;
        v = [];
        for (f in S)
          v.push(f);
        return v;
      })()), u = 0, s = o.length; u < s; u++)
        l = o[u], this.pruningTables[l] === null && (i = S[l], this.pruningTables[l] = Y(...i));
      return this;
    }, t.initSolver = function() {
      return t.computeMoveTables(), t.computePruningTables();
    }, t.prototype.solveUpright = function(o = 22) {
      var s, u, f, i, l, v, F, D, A;
      return f = (function() {
        var b, c, p, L, d, x, P;
        for (c = ["U", "R", "F", "D", "L", "B"], x = ["", "2", "'"], P = [], b = p = 0; p <= 5; b = ++p)
          for (d = L = 0; L <= 2; d = ++L)
            P.push(c[b] + x[d]);
        return P;
      })(), s = class {
        constructor(c) {
          this.parent = null, this.lastMove = null, this.depth = 0, c && this.init(c);
        }
        init(c) {
          return this.flip = c.flip(), this.twist = c.twist(), this.slice = c.FRtoBR() / $ | 0, this.parity = c.cornerParity(), this.URFtoDLF = c.URFtoDLF(), this.FRtoBR = c.FRtoBR(), this.URtoUL = c.URtoUL(), this.UBtoDF = c.UBtoDF(), this;
        }
        solution() {
          return this.parent ? this.parent.solution() + f[this.lastMove] + " " : "";
        }
        //# Helpers
        move(c, p, L) {
          return t.moveTables[c][p][L];
        }
        pruning(c, p) {
          return U(t.pruningTables[c], p);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? R[this.lastMove / 3 | 0] : we;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var c, p;
          return c = this.pruning("sliceFlip", J * this.flip + this.slice), p = this.pruning("sliceTwist", J * this.twist + this.slice), a(c, p);
        }
        // Compute the next phase 1 state for the given move
        next1(c) {
          var p;
          return p = u.pop(), p.parent = this, p.lastMove = c, p.depth = this.depth + 1, p.flip = this.move("flip", this.flip, c), p.twist = this.move("twist", this.twist, c), p.slice = this.move("FRtoBR", this.slice * 24, c) / 24 | 0, p;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? M[this.lastMove / 3 | 0] : K;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var c, p, L, d;
          return L = ($ * this.URtoDF + this.FRtoBR) * Z + this.parity, c = this.pruning("sliceURtoDFParity", L), d = ($ * this.URFtoDLF + this.FRtoBR) * Z + this.parity, p = this.pruning("sliceURFtoDLFParity", d), a(c, p);
        }
        // Initialize phase 2 coordinates
        init2(c = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), c))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(c) {
          var p;
          return p = u.pop(), p.parent = this, p.lastMove = c, p.depth = this.depth + 1, p.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, c), p.FRtoBR = this.move("FRtoBR", this.FRtoBR, c), p.parity = this.move("parity", this.parity, c), p.URtoDF = this.move("URtoDF", this.URtoDF, c), p;
        }
      }, D = null, l = function(b) {
        var c, p, L, d;
        for (c = 0, d = [], c = p = 1, L = o; (1 <= L ? p <= L : p >= L) && (i(b, c), D === null); c = 1 <= L ? ++p : --p)
          d.push(c++);
        return d;
      }, i = function(b, c) {
        var p, L, d, x, P, q, ce;
        if (c === 0) {
          if (b.minDist1() === 0 && (b.lastMove === null || (P = b.lastMove, te.call(K, P) < 0)))
            return F(b);
        } else if (c > 0 && b.minDist1() <= c) {
          for (q = b.moves1(), ce = [], L = 0, p = q.length; L < p && (d = q[L], x = b.next1(d), i(x, c - 1), u.push(x), D === null); L++)
            ce.push(void 0);
          return ce;
        }
      }, F = function(b) {
        var c, p, L, d;
        for (b.init2(), d = [], c = p = 1, L = o - b.depth; (1 <= L ? p <= L : p >= L) && (v(b, c), D === null); c = 1 <= L ? ++p : --p)
          d.push(c++);
        return d;
      }, v = function(b, c) {
        var p, L, d, x, P, q;
        if (c === 0) {
          if (b.minDist2() === 0)
            return D = b.solution();
        } else if (c > 0 && b.minDist2() <= c) {
          for (P = b.moves2(), q = [], L = 0, p = P.length; L < p && (d = P[L], x = b.next2(d), v(x, c - 1), u.push(x), D === null); L++)
            q.push(void 0);
          return q;
        }
      }, u = (function() {
        var b, c, p;
        for (p = [], b = 0, c = o + 1; 0 <= c ? b <= c : b >= c; 0 <= c ? ++b : --b)
          p.push(new s());
        return p;
      })(), A = u.pop().init(this), l(A), u.push(A), D.length > 0 && (D = D.substring(0, D.length - 1)), D;
    }, k = {
      U: 0,
      R: 1,
      F: 2,
      D: 3,
      L: 4,
      B: 5
    }, B = {
      0: "U",
      1: "R",
      2: "F",
      3: "D",
      4: "L",
      5: "B"
    }, t.prototype.solve = function(o = 22) {
      var s, u, f, i, l, v, F, D, A;
      for (s = this.clone(), D = s.upright(), s.move(D), v = new t().move(D).center, A = s.solveUpright(o), F = [], l = A.split(" "), f = 0, u = l.length; f < u; f++)
        i = l[f], F.push(B[v[k[i[0]]]]), i.length > 1 && (F[F.length - 1] += i[1]);
      return F.join(" ");
    }, t.scramble = function() {
      return t.inverse(t.random().solve());
    };
  }).call(Ve)), Ve;
}
var Je, st;
function Lt() {
  return st || (st = 1, Je = ht(), St()), Je;
}
var Et = Lt();
const Fe = /* @__PURE__ */ Dt(Et), qe = 4294967296;
function pt() {
  const e = globalThis.crypto;
  if (!(e != null && e.getRandomValues))
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  const r = new Uint32Array(1);
  return e.getRandomValues(r), r[0];
}
function et(e, r = pt) {
  if (!Number.isSafeInteger(e) || e < 1 || e > qe)
    throw new RangeError("Invalid random integer range");
  const n = Math.floor(qe / e) * e;
  for (; ; ) {
    const t = r();
    if (!Number.isInteger(t) || t < 0 || t >= qe)
      throw new RangeError("Random source must return a uint32");
    if (t < n)
      return t % e;
  }
}
function Bt(e, r = pt) {
  const n = [...e];
  for (let t = n.length - 1; t > 0; t--) {
    const y = et(t + 1, r);
    [n[t], n[y]] = [n[y], n[t]];
  }
  return n;
}
function Ke(e, r) {
  if (!Number.isSafeInteger(e) || e < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return Bt(
    Array.from({ length: e }, (n, t) => t),
    r
  );
}
function ke(e) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    for (let t = n + 1; t < e.length; t++)
      e[n] > e[t] && (r ^= 1);
  return r;
}
function ut(e, r) {
  return !Array.isArray(e) || e.length !== r ? !1 : new Set(e).size === r && e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < r
  );
}
function Mt(e) {
  return Array.isArray(e) && e.length === 6 && e.every((r, n) => r === n);
}
function ft(e, r, n) {
  return !Array.isArray(e) || e.length !== r || !e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < n
  ) ? !1 : e.reduce((t, y) => t + y, 0) % n === 0;
}
function Nt(e) {
  if (!e || typeof e != "object")
    return !1;
  const { center: r, cp: n, co: t, ep: y, eo: E } = e;
  return r !== void 0 && !Mt(r) || !ut(n, 8) || !ut(y, 12) || !ft(t, 8, 3) || !ft(E, 12, 2) ? !1 : ke(n) === ke(y);
}
function Ot(e) {
  if (!Nt(e))
    throw new Error("Invalid 3x3 cube state");
  return e;
}
function ct(e, r, n) {
  const t = [];
  let y = 0;
  for (let E = 0; E < e - 1; E++) {
    const O = et(r, n);
    t.push(O), y += O;
  }
  return t.push((r - y % r) % r), t;
}
function Tt(e) {
  let r, n;
  do
    r = Ke(8, e), n = Ke(12, e);
  while (ke(r) !== ke(n));
  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: r,
    co: ct(8, 3, e),
    ep: n,
    eo: ct(12, 2, e)
  };
}
let xe;
async function At() {
  xe || (xe = Promise.resolve().then(() => {
    Fe.initSolver();
  }));
  try {
    await xe;
  } catch (e) {
    throw xe = void 0, e;
  }
}
function tt(e) {
  return Ot(e), new Fe({
    center: e.center ?? [0, 1, 2, 3, 4, 5],
    cp: e.cp,
    co: e.co,
    ep: e.ep,
    eo: e.eo
  });
}
function Ct(e) {
  const r = tt(e), n = r.solve();
  if (typeof n != "string" || !n.trim())
    throw new Error("Solver did not return a valid solution");
  if (!r.clone().move(n).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return n.trim();
}
function xt(e) {
  return Fe.inverse(e).trim();
}
const It = ["U", "R", "F", "D", "L", "B"], kt = ["", "2", "'"];
let ze;
function Pt() {
  if (!ze) {
    const e = /* @__PURE__ */ new Set();
    e.add(new Fe().asString());
    for (const r of It)
      for (const n of kt)
        e.add(
          new Fe().move(r + n).asString()
        );
    ze = e;
  }
  return ze;
}
function jt(e) {
  const r = tt(e);
  return !Pt().has(r.asString());
}
function $t(e) {
  for (; ; ) {
    const r = Tt(e);
    if (jt(r))
      return {
        stateData: r,
        cube: tt(r)
      };
  }
}
async function _t(e) {
  await At();
  const { stateData: r, cube: n } = $t(e), t = Ct(r), y = xt(t);
  if (new Fe().move(y).asString() !== n.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!n.clone().move(t).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: y,
    moves: y.split(/\s+/),
    state: r
  };
}
const mt = 8, Ye = 6;
function Vt(e) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    for (let t = n + 1; t < e.length; t++)
      e[n] > e[t] && (r ^= 1);
  return r;
}
function Jt(e, r) {
  return !Array.isArray(e) || e.length !== r ? !1 : new Set(e).size === r && e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < r
  );
}
function qt(e) {
  return !Array.isArray(e) || e.length !== mt || !e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < 3
  ) ? !1 : e[Ye] === 0 && e.reduce((r, n) => r + n, 0) % 3 === 0;
}
function zt(e) {
  return !e || typeof e != "object" || !Jt(e.cp, mt) || !qt(e.co) ? !1 : e.cp[Ye] === Ye;
}
function Pe(e) {
  if (!zt(e))
    throw new Error("Invalid 2x2 cube state");
  return e;
}
const Gt = [0, 1, 2, 3, 4, 5, 7], lt = [0, 1, 2, 3, 4, 5, 7];
function Xt(e) {
  const r = Ke(7, e), n = Array(8).fill(0);
  n[6] = 6;
  for (let t = 0; t < lt.length; t++)
    n[lt[t]] = Gt[r[t]];
  return n;
}
function Wt(e) {
  const r = Array(8).fill(0);
  let n = 0;
  for (let t = 0; t < 6; t++)
    r[t] = et(3, e), n += r[t];
  return r[6] = 0, r[7] = (3 - n % 3) % 3, r;
}
function Kt(e) {
  return Pe({
    cp: Xt(e),
    co: Wt(e)
  });
}
const Ae = [
  "U",
  "U2",
  "U'",
  "R",
  "R2",
  "R'",
  "F",
  "F2",
  "F'"
], Yt = [2, 1, 0, 5, 4, 3, 8, 7, 6], Ht = [0, 0, 0, 1, 1, 1, 2, 2, 2], vt = [0, 1, 2, 3, 4, 5, 7], wt = [0, 1, 2, 3, 4, 5, 7], Ge = 5040, Xe = 729, ve = Ae.length, Ft = [1, 1, 2, 6, 24, 120, 720, 5040];
let He = null;
function Qt(e) {
  if (Pe(e), e.cp[6] !== 6 || e.co[6] !== 0)
    throw new Error(
      "2×2 state is not reachable using only U, R and F turns"
    );
  return e;
}
function Rt(e) {
  const r = wt.map((t) => {
    const y = vt.indexOf(e[t]);
    if (y === -1)
      throw new Error("Invalid movable-corner permutation");
    return y;
  });
  let n = 0;
  for (let t = 0; t < 7; t++) {
    let y = 0;
    for (let E = t + 1; E < 7; E++)
      r[E] < r[t] && y++;
    n += y * Ft[6 - t];
  }
  return n;
}
function Zt(e) {
  const r = Array.from({ length: 7 }, (y, E) => E), n = [];
  for (let y = 0; y < 7; y++) {
    const E = Ft[6 - y], O = Math.floor(e / E);
    e %= E, n.push(r.splice(O, 1)[0]);
  }
  const t = Array(8).fill(0);
  t[6] = 6;
  for (let y = 0; y < 7; y++)
    t[wt[y]] = vt[n[y]];
  return t;
}
function gt(e) {
  let r = 0;
  for (let n = 0; n < 6; n++)
    r = r * 3 + e[n];
  return r;
}
function er(e) {
  const r = Array(8).fill(0);
  let n = 0;
  for (let t = 5; t >= 0; t--)
    r[t] = e % 3, n += r[t], e = Math.floor(e / 3);
  return r[6] = 0, r[7] = (3 - n % 3) % 3, r;
}
function tr(e, r) {
  return r.cp.map((n) => e[n]);
}
function rr(e, r) {
  return r.cp.map(
    (n, t) => (e[n] + r.co[t]) % 3
  );
}
function at(e, r, n) {
  const t = new Int8Array(e);
  t.fill(-1), t[0] = 0;
  const y = new Int32Array(e);
  let E = 0, O = 1;
  for (y[0] = 0; E < O; ) {
    const C = y[E++], z = t[C] + 1;
    for (let _ = 0; _ < ve; _++) {
      const G = r[C * ve + _];
      t[G] === -1 && (t[G] = z, y[O++] = G);
    }
  }
  if (O !== e)
    throw new Error(
      `Incomplete ${n} pruning table: reached ${O} of ${e} coordinates`
    );
  return t;
}
function dt() {
  if (He)
    return;
  const e = Ae.map((t) => {
    const y = new Fe();
    return y.move(t), {
      cp: Array.from(y.cp),
      co: Array.from(y.co)
    };
  }), r = new Uint16Array(
    Ge * ve
  );
  for (let t = 0; t < Ge; t++) {
    const y = Zt(t);
    for (let E = 0; E < ve; E++) {
      const O = tr(y, e[E]);
      r[t * ve + E] = Rt(O);
    }
  }
  const n = new Uint16Array(
    Xe * ve
  );
  for (let t = 0; t < Xe; t++) {
    const y = er(t);
    for (let E = 0; E < ve; E++) {
      const O = rr(y, e[E]);
      n[t * ve + E] = gt(O);
    }
  }
  He = {
    permutationMoves: r,
    orientationMoves: n,
    permutationDistances: at(
      Ge,
      r,
      "permutation"
    ),
    orientationDistances: at(
      Xe,
      n,
      "orientation"
    )
  };
}
function nr() {
  dt();
}
function or(e) {
  Pe(e);
  const r = Array.from({ length: 12 }, (n, t) => t);
  return Vt(e.cp) !== 0 && ([r[0], r[1]] = [r[1], r[0]]), {
    center: [0, 1, 2, 3, 4, 5],
    cp: [...e.cp],
    co: [...e.co],
    ep: r,
    eo: Array(12).fill(0)
  };
}
function ir(e) {
  return new Fe(or(e));
}
function sr(e) {
  if (typeof e != "string")
    throw new TypeError("Solution must be a string");
  return (e.trim() === "" ? [] : e.trim().split(/\s+/)).reverse().map((n) => {
    const t = Ae.indexOf(n);
    if (t === -1)
      throw new RangeError(`Unsupported 2×2 move: "${n}"`);
    return Ae[Yt[t]];
  }).join(" ");
}
function ur(e) {
  Qt(e), dt();
  const r = Rt(e.cp), n = gt(e.co);
  if (r === 0 && n === 0)
    return "";
  const {
    permutationMoves: t,
    orientationMoves: y,
    permutationDistances: E,
    orientationDistances: O
  } = He, C = [], z = 20;
  function _(j, X, W, he) {
    if (j === 0 && X === 0)
      return !0;
    if (Math.max(
      E[j],
      O[X]
    ) > W || W === 0)
      return !1;
    for (let V = 0; V < ve; V++) {
      const Z = Ht[V];
      if (Z === he)
        continue;
      const J = t[j * ve + V], $ = y[X * ve + V];
      if (C.push(V), _(J, $, W - 1, Z))
        return !0;
      C.pop();
    }
    return !1;
  }
  const G = Math.max(
    E[r],
    O[n]
  );
  for (let j = G; j <= z; j++)
    if (C.length = 0, _(r, n, j, -1))
      return C.map((X) => Ae[X]).join(" ");
  throw new Error(
    "Could not find a 2×2 solution within the search limit."
  );
}
const fr = ["U", "R", "F", "D", "L", "B"], cr = ["", "2", "'"];
let We;
function Qe(e) {
  return `${Array.from(e.cp).join(",")}|${Array.from(e.co).join(",")}`;
}
function lr() {
  if (!We) {
    const e = /* @__PURE__ */ new Set();
    e.add(Qe({
      cp: [0, 1, 2, 3, 4, 5, 6, 7],
      co: Array(8).fill(0)
    }));
    for (const r of fr)
      for (const n of cr) {
        const t = new Fe().move(r + n);
        e.add(Qe({
          cp: t.cp,
          co: t.co
        }));
      }
    We = e;
  }
  return We;
}
function ar(e) {
  return Pe(e), !lr().has(Qe(e));
}
function hr(e) {
  for (; ; ) {
    const r = Kt(e);
    if (ar(r))
      return {
        state: r,
        cube: ir(r)
      };
  }
}
function pr(e, r) {
  return Array.from(e.cp).every((n, t) => n === r.cp[t]) && Array.from(e.co).every((n, t) => n === r.co[t]);
}
async function mr(e) {
  await nr();
  const { state: r, cube: n } = hr(e), t = ur(r), y = sr(t), E = new Fe().move(y);
  if (!pr(E, r))
    throw new Error(
      "2×2 scramble replay failed: generated corner state does not match target"
    );
  const O = n.clone().move(t);
  if (!Array.from(O.cp).every((C, z) => C === z) || !Array.from(O.co).every((C) => C === 0))
    throw new Error(
      "2×2 solution verification failed: corners did not return to identity"
    );
  return {
    event: "222",
    notation: y,
    moves: y.split(/\s+/),
    state: r
  };
}
function vr(e) {
  if (typeof e != "string" || !/^[a-z0-9]+$/.test(e))
    throw new TypeError(
      "Event ID must be a non-empty lowercase alphanumeric string"
    );
}
function wr(e) {
  if (typeof e != "function")
    throw new TypeError("Event generator must be a function");
}
function Fr() {
  const e = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(r, n) {
      if (vr(r), wr(n), e.has(r))
        throw new RangeError(`Event "${r}" is already registered`);
      e.set(r, n);
    },
    get(r) {
      return e.get(r);
    },
    list() {
      return Object.freeze([...e.keys()]);
    }
  });
}
const Ze = Fr();
let Ut = Object.freeze([]);
function yt(e, r) {
  Ze.register(e, r), Ut = Ze.list();
}
function Rr(e) {
  return Ze.get(e);
}
yt(
  "333",
  ({ randomWord: e } = {}) => _t(e)
);
yt(
  "222",
  ({ randomWord: e } = {}) => mr(e)
);
async function dr(e = "333", r = {}) {
  if (!r || typeof r != "object" || Array.isArray(r))
    throw new TypeError("options must be an object");
  if (r.randomWord !== void 0 && typeof r.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  const n = Rr(e);
  if (!n)
    throw new RangeError(
      `Unsupported event "${e}". Supported events: ${Ut.join(", ")}`
    );
  return await n(r);
}
export {
  Ut as events,
  dr as generate,
  yt as registerEvent
};
