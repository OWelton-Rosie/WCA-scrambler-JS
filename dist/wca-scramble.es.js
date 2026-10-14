function Kt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = { exports: {} }, Gt = je.exports, gt;
function At() {
  return gt || (gt = 1, (function(e) {
    (function() {
      var t, n, r, c, d, F, L, M, k, P, I, G, X, pe, Q, q, Z, J, z, re, se, ne, oe, ce, ue, ae, le, Re, $e, Fe, he, me, de;
      [z, J, pe, d, Z, t] = [0, 1, 2, 3, 4, 5], [le, oe, ue, se, k, I, L, X] = [0, 1, 2, 3, 4, 5, 6, 7], [ae, ne, ce, re, G, M, P, F, q, Q, n, r] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [$e, he, de] = (function() {
        var Y, W, H, A, _, v;
        return v = function(h) {
          return h - 1;
        }, _ = function(h) {
          return v(9) + h;
        }, H = function(h) {
          return _(9) + h;
        }, W = function(h) {
          return H(9) + h;
        }, A = function(h) {
          return W(9) + h;
        }, Y = function(h) {
          return A(9) + h;
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
              v(9),
              _(1),
              H(3)
            ],
            [
              v(7),
              H(1),
              A(3)
            ],
            [
              v(1),
              A(1),
              Y(3)
            ],
            [
              v(3),
              Y(1),
              _(3)
            ],
            [
              W(3),
              H(9),
              _(7)
            ],
            [
              W(1),
              A(9),
              H(7)
            ],
            [
              W(7),
              Y(9),
              A(7)
            ],
            [
              W(9),
              _(9),
              Y(7)
            ]
          ],
          // Edges
          [
            [
              v(6),
              _(2)
            ],
            [
              v(8),
              H(2)
            ],
            [
              v(4),
              A(2)
            ],
            [
              v(2),
              Y(2)
            ],
            [
              W(6),
              _(8)
            ],
            [
              W(2),
              H(8)
            ],
            [
              W(4),
              A(8)
            ],
            [
              W(8),
              Y(8)
            ],
            [
              H(6),
              _(4)
            ],
            [
              H(4),
              A(6)
            ],
            [
              Y(6),
              A(4)
            ],
            [
              Y(4),
              _(6)
            ]
          ]
        ];
      })(), Re = ["U", "R", "F", "D", "L", "B"], Fe = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], me = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], c = (function() {
        var Y, W, H;
        class A {
          constructor(v) {
            v != null ? this.init(v) : this.identity(), this.newCenter = (function() {
              var h, p;
              for (p = [], h = 0; h <= 5; ++h)
                p.push(0);
              return p;
            })(), this.newCp = (function() {
              var h, p;
              for (p = [], h = 0; h <= 7; ++h)
                p.push(0);
              return p;
            })(), this.newEp = (function() {
              var h, p;
              for (p = [], h = 0; h <= 11; ++h)
                p.push(0);
              return p;
            })(), this.newCo = (function() {
              var h, p;
              for (p = [], h = 0; h <= 7; ++h)
                p.push(0);
              return p;
            })(), this.newEo = (function() {
              var h, p;
              for (p = [], h = 0; h <= 11; ++h)
                p.push(0);
              return p;
            })();
          }
          init(v) {
            return this.center = v.center.slice(0), this.co = v.co.slice(0), this.ep = v.ep.slice(0), this.cp = v.cp.slice(0), this.eo = v.eo.slice(0);
          }
          identity() {
            return this.center = [0, 1, 2, 3, 4, 5], this.cp = [0, 1, 2, 3, 4, 5, 6, 7], this.co = (function() {
              var v, h;
              for (h = [], v = 0; v <= 7; ++v)
                h.push(0);
              return h;
            })(), this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.eo = (function() {
              var v, h;
              for (h = [], v = 0; v <= 11; ++v)
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
            var v, h, p, g, U, R, T, x, S, B, N;
            for (N = [], p = g = 0; g <= 5; p = ++g)
              N[9 * p + 4] = Re[this.center[p]];
            for (p = U = 0; U <= 7; p = ++U)
              for (v = this.cp[p], S = this.co[p], T = R = 0; R <= 2; T = ++R)
                N[he[p][(T + S) % 3]] = Fe[v][T];
            for (p = x = 0; x <= 11; p = ++x)
              for (h = this.ep[p], S = this.eo[p], T = B = 0; B <= 1; T = ++B)
                N[de[p][(T + S) % 2]] = me[h][T];
            return N.join("");
          }
          static fromString(v) {
            var h, p, g, U, R, T, x, S, B, N, j, ee, te, o;
            for (g = new A(), U = T = 0; T <= 5; U = ++T)
              for (R = x = 0; x <= 5; R = ++x)
                v[9 * U + 4] === Re[R] && (g.center[U] = R);
            for (U = S = 0; S <= 7; U = ++S) {
              for (N = B = 0; B <= 2 && !((o = v[he[U][N]]) === "U" || o === "D"); N = ++B)
                ;
              for (h = v[he[U][(N + 1) % 3]], p = v[he[U][(N + 2) % 3]], R = j = 0; j <= 7; R = ++j)
                h === Fe[R][1] && p === Fe[R][2] && (g.cp[U] = R, g.co[U] = N % 3);
            }
            for (U = ee = 0; ee <= 11; U = ++ee)
              for (R = te = 0; te <= 11; R = ++te) {
                if (v[de[U][0]] === me[R][0] && v[de[U][1]] === me[R][1]) {
                  g.ep[U] = R, g.eo[U] = 0;
                  break;
                }
                if (v[de[U][0]] === me[R][1] && v[de[U][1]] === me[R][0]) {
                  g.ep[U] = R, g.eo[U] = 1;
                  break;
                }
              }
            return g;
          }
          clone() {
            return new A(this.toJSON());
          }
          // A class method returning a new random cube
          static random() {
            return new A().randomize();
          }
          isSolved() {
            var v, h, p, g, U, R, T;
            for (p = this.clone(), p.move(p.upright()), h = U = 0; U <= 5; h = ++U)
              if (p.center[h] !== h)
                return !1;
            for (v = R = 0; R <= 7; v = ++R)
              if (p.cp[v] !== v || p.co[v] !== 0)
                return !1;
            for (g = T = 0; T <= 11; g = ++T)
              if (p.ep[g] !== g || p.eo[g] !== 0)
                return !1;
            return !0;
          }
          // Multiply this Cube with another Cube, restricted to centers.
          centerMultiply(v) {
            var h, p, g;
            for (g = p = 0; p <= 5; g = ++p)
              h = v.center[g], this.newCenter[g] = this.center[h];
            return [this.center, this.newCenter] = [this.newCenter, this.center], this;
          }
          // Multiply this Cube with another Cube, restricted to corners.
          cornerMultiply(v) {
            var h, p, g;
            for (g = p = 0; p <= 7; g = ++p)
              h = v.cp[g], this.newCp[g] = this.cp[h], this.newCo[g] = (this.co[h] + v.co[g]) % 3;
            return [this.cp, this.newCp] = [this.newCp, this.cp], [this.co, this.newCo] = [this.newCo, this.co], this;
          }
          // Multiply this Cube with another Cube, restricted to edges
          edgeMultiply(v) {
            var h, p, g;
            for (g = p = 0; p <= 11; g = ++p)
              h = v.ep[g], this.newEp[g] = this.ep[h], this.newEo[g] = (this.eo[h] + v.eo[g]) % 2;
            return [this.ep, this.newEp] = [this.newEp, this.ep], [this.eo, this.newEo] = [this.newEo, this.eo], this;
          }
          // Multiply this cube with another Cube
          multiply(v) {
            return this.centerMultiply(v), this.cornerMultiply(v), this.edgeMultiply(v), this;
          }
          move(v) {
            var h, p, g, U, R, T, x, S;
            for (x = H(v), p = 0, U = x.length; p < U; p++)
              for (R = x[p], h = R / 3 | 0, T = R % 3, g = 0, S = T; 0 <= S ? g <= S : g >= S; 0 <= S ? ++g : --g)
                this.multiply(A.moves[h]);
            return this;
          }
          upright() {
            var v, h, p, g, U, R;
            for (v = this.clone(), R = [], h = g = 0; g <= 5 && v.center[h] !== pe; h = ++g)
              ;
            switch (h) {
              case d:
                R.push("x");
                break;
              case z:
                R.push("x'");
                break;
              case t:
                R.push("x2");
                break;
              case J:
                R.push("y");
                break;
              case Z:
                R.push("y'");
            }
            for (R.length && v.move(R[0]), p = U = 0; U <= 5 && v.center[p] !== z; p = ++U)
              ;
            switch (p) {
              case Z:
                R.push("z");
                break;
              case J:
                R.push("z'");
                break;
              case d:
                R.push("z2");
            }
            return R.join(" ");
          }
          static inverse(v) {
            var h, p, g, U, R, T, x;
            if (T = (function() {
              var S, B, N, j;
              for (N = H(v), j = [], S = 0, B = N.length; S < B; S++)
                U = N[S], h = U / 3 | 0, R = U % 3, j.push(h * 3 + -(R - 1) + 1);
              return j;
            })(), T.reverse(), typeof v == "string") {
              for (x = "", p = 0, g = T.length; p < g; p++)
                U = T[p], h = U / 3 | 0, R = U % 3, x += Y[h], R === 1 ? x += "2" : R === 2 && (x += "'"), x += " ";
              return x.substring(0, x.length - 1);
            } else return v.length != null ? T : T[0];
          }
        }
        return A.prototype.randomize = (function() {
          var _, v, h, p, g, U, R, T, x;
          return U = function(S, B) {
            return S + Math.floor(Math.random() * (B - S + 1));
          }, x = function(S) {
            var B, N;
            for (B = S.length; B !== 0; )
              N = U(0, B - 1), B -= 1, S[B], [S[B], S[N]] = [S[N], S[B]];
          }, p = function(S) {
            var B, N, j, ee, te, o, s;
            for (te = 0, s = (function() {
              var u, f, i;
              for (i = [], u = 0, f = S.length - 1; 0 <= f ? u <= f : u >= f; 0 <= f ? ++u : --u)
                i.push(!1);
              return i;
            })(); ; ) {
              for (B = -1, j = ee = 0, o = S.length - 1; 0 <= o ? ee <= o : ee >= o; j = 0 <= o ? ++ee : --ee)
                if (!s[j]) {
                  B = j;
                  break;
                }
              if (B === -1)
                break;
              for (N = 0; !s[B]; )
                s[B] = !0, N++, B = S[B];
              te += N + 1;
            }
            return te;
          }, _ = function(S, B) {
            var N;
            return N = p(B) + p(S), N % 2 === 0;
          }, h = function(S, B) {
            for (x(B), x(S); !_(S, B); )
              x(B), x(S);
          }, R = function(S, B) {
            var N, j, ee, te;
            for (ee = 0, N = j = 0, te = S.length - 1; 0 <= te ? j <= te : j >= te; N = 0 <= te ? ++j : --j)
              ee += S[N] = U(0, B - 1);
          }, g = function(S, B) {
            return S.reduce(function(N, j) {
              return N + j;
            }) % B === 0;
          }, v = function(S, B) {
            for (R(S, 3); !g(S, 3); )
              R(S, 3);
            for (R(B, 2); !g(B, 2); )
              R(B, 2);
          }, T = function() {
            return h(this.cp, this.ep), v(this.co, this.eo), this;
          }, T;
        })(), A.moves = [
          {
            // U
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              se,
              le,
              oe,
              ue,
              k,
              I,
              L,
              X
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
              ae,
              ne,
              ce,
              G,
              M,
              P,
              F,
              q,
              Q,
              n,
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
              k,
              oe,
              ue,
              le,
              X,
              I,
              L,
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
              q,
              ne,
              ce,
              re,
              r,
              M,
              P,
              F,
              G,
              Q,
              n,
              ae
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
              I,
              ue,
              se,
              le,
              k,
              L,
              X
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
              ae,
              Q,
              ce,
              re,
              G,
              q,
              P,
              F,
              ne,
              M,
              n,
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
              le,
              oe,
              ue,
              se,
              I,
              L,
              X,
              k
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
              ae,
              ne,
              ce,
              re,
              M,
              P,
              F,
              G,
              q,
              Q,
              n,
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
              le,
              ue,
              L,
              se,
              k,
              oe,
              I,
              X
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
              ae,
              ne,
              n,
              re,
              G,
              M,
              Q,
              F,
              q,
              ce,
              P,
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
              le,
              oe,
              se,
              X,
              k,
              I,
              ue,
              L
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
              ae,
              ne,
              ce,
              r,
              G,
              M,
              P,
              n,
              q,
              Q,
              re,
              F
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
              z,
              pe,
              Z,
              d,
              t,
              J
            ],
            cp: [
              le,
              oe,
              ue,
              se,
              k,
              I,
              L,
              X
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
              ae,
              ne,
              ce,
              re,
              G,
              M,
              P,
              F,
              Q,
              n,
              r,
              q
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
              t,
              J,
              z,
              pe,
              Z,
              d
            ],
            cp: [
              le,
              oe,
              ue,
              se,
              k,
              I,
              L,
              X
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
              ae,
              re,
              ce,
              F,
              G,
              ne,
              P,
              M,
              q,
              Q,
              n,
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
              Z,
              z,
              pe,
              J,
              d,
              t
            ],
            cp: [
              le,
              oe,
              ue,
              se,
              k,
              I,
              L,
              X
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
              ce,
              ne,
              P,
              re,
              ae,
              M,
              G,
              F,
              q,
              Q,
              n,
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
        ], W = {
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
        }, Y = {
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
        }, H = function(_) {
          var v, h, p, g, U, R, T;
          if (typeof _ == "string") {
            for (R = _.split(/\s+/), T = [], v = 0, h = R.length; v < h; v++)
              if (g = R[v], g.length !== 0) {
                if (g.length > 2)
                  throw new Error(`Invalid move: ${g}`);
                if (p = W[g[0]], p === void 0)
                  throw new Error(`Invalid move: ${g}`);
                if (g.length === 1)
                  U = 0;
                else if (g[1] === "2")
                  U = 1;
                else if (g[1] === "'")
                  U = 2;
                else
                  throw new Error(`Invalid move: ${g}`);
                T.push(p * 3 + U);
              }
            return T;
          } else return _.length != null ? _ : [_];
        }, A.moves.push(new A().move("R M' L'").toJSON()), A.moves.push(new A().move("U E' D'").toJSON()), A.moves.push(new A().move("F S B'").toJSON()), A.moves.push(new A().move("U E'").toJSON()), A.moves.push(new A().move("R M'").toJSON()), A.moves.push(new A().move("F S").toJSON()), A.moves.push(new A().move("D E").toJSON()), A.moves.push(new A().move("L M").toJSON()), A.moves.push(new A().move("B S'").toJSON()), A;
      }).call(this), e !== null ? e.exports = c : this.Cube = c;
    }).call(Gt);
  })(je)), je.exports;
}
var We = {}, yt;
function Xt() {
  return yt || (yt = 1, (function() {
    var e, t, n, r, c, d, F, L, M, k, P, I, G, X, pe, Q, q, Z, J, z, re, se, ne, oe, ce, ue, ae, le, Re, $e, Fe, he, me, de, Y, W, H, A, _, v, h, p, g, U, R, T, x, S, B, N, j, ee, te = [].indexOf;
    r = this.Cube || At(), [me, Re, Fe, ae, L, k, d, I] = [0, 1, 2, 3, 4, 5, 6, 7], [he, le, $e, ue, P, F, M, c, X, G, e, t] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], n = function(o, s) {
      var u, f, i;
      if (o < s)
        return 0;
      for (s > o / 2 && (s = o - s), i = 1, u = o, f = 1; u !== o - s; )
        i *= u, i /= f, u--, f++;
      return i;
    }, v = function(o) {
      var s, u, f, i;
      for (s = 1, u = f = 2, i = o; 2 <= i ? f <= i : f >= i; u = 2 <= i ? ++f : --f)
        s *= u;
      return s;
    }, p = function(o, s) {
      return o > s ? o : s;
    }, N = function(o, s, u) {
      var f, i, l, w, y;
      for (y = o[s], f = i = l = s, w = u - 1; l <= w ? i <= w : i >= w; f = l <= w ? ++i : --i)
        o[f] = o[f + 1];
      return o[u] = y;
    }, j = function(o, s, u) {
      var f, i, l, w, y;
      for (y = o[u], f = i = l = u, w = s + 1; l <= w ? i <= w : i >= w; f = l <= w ? ++i : --i)
        o[f] = o[f - 1];
      return o[s] = y;
    }, x = function(o, s, u, f = !1) {
      var i, l, w, y, E, C;
      return y = u - s, w = v(y + 1), o === "corners" ? (l = 7, C = "cp") : (l = 11, C = "ep"), E = (function() {
        var D, a, m;
        for (m = [], i = D = 0, a = y; 0 <= a ? D <= a : D >= a; i = 0 <= a ? ++D : --D)
          m.push(0);
        return m;
      })(), function(D) {
        var a, m, O, b, $, V, K, fe, ge, Ue, be, Se, Xe, Ee, De, Ye, Le, He, dt, Be, wt, Oe, Ae, Me, ie, Te, Ne;
        if (D != null) {
          for (i = V = 0, be = y; 0 <= be ? V <= be : V >= be; i = 0 <= be ? ++V : --V)
            E[i] = i + s;
          for (m = D % w, a = D / w | 0, ge = this[C], i = K = 0, Se = l; 0 <= Se ? K <= Se : K >= Se; i = 0 <= Se ? ++K : --K)
            ge[i] = -1;
          for (b = fe = 1, Ee = y; 1 <= Ee ? fe <= Ee : fe >= Ee; b = 1 <= Ee ? ++fe : --fe)
            for ($ = m % (b + 1), m = m / (b + 1) | 0; $ > 0; )
              j(E, 0, b), $--;
          if (ie = y, f)
            for (b = Ue = 0, De = l; 0 <= De ? Ue <= De : Ue >= De; b = 0 <= De ? ++Ue : --Ue)
              O = n(l - b, ie + 1), a - O >= 0 && (ge[b] = E[y - ie], a -= O, ie--);
          else
            for (b = Oe = Ye = l; Ye <= 0 ? Oe <= 0 : Oe >= 0; b = Ye <= 0 ? ++Oe : --Oe)
              O = n(b, ie + 1), a - O >= 0 && (ge[b] = E[ie], a -= O, ie--);
          return this;
        } else {
          for (ge = this[C], i = Ae = 0, Le = y; 0 <= Le ? Ae <= Le : Ae >= Le; i = 0 <= Le ? ++Ae : --Ae)
            E[i] = -1;
          if (a = m = ie = 0, f)
            for (b = Me = He = l; He <= 0 ? Me <= 0 : Me >= 0; b = He <= 0 ? ++Me : --Me)
              s <= (dt = ge[b]) && dt <= u && (a += n(l - b, ie + 1), E[y - ie] = ge[b], ie++);
          else
            for (b = Te = 0, Be = l; 0 <= Be ? Te <= Be : Te >= Be; b = 0 <= Be ? ++Te : --Te)
              s <= (wt = ge[b]) && wt <= u && (a += n(b, ie + 1), E[ie] = ge[b], ie++);
          for (b = Ne = Xe = y; Xe <= 0 ? Ne <= 0 : Ne >= 0; b = Xe <= 0 ? ++Ne : --Ne) {
            for ($ = 0; E[b] !== s + b; )
              N(E, 0, b), $++;
            m = (b + 1) * m + $;
          }
          return a * w + m;
        }
      };
    }, pe = {
      // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
      // the DRB corner is fully determined by the orientation of the other
      // corners.
      twist: function(o) {
        var s, u, f, i, l, w;
        if (o != null) {
          for (l = 0, s = u = 6; u >= 0; s = --u)
            i = o % 3, o = o / 3 | 0, this.co[s] = i, l += i;
          return this.co[7] = (3 - l % 3) % 3, this;
        } else {
          for (w = 0, s = f = 0; f <= 6; s = ++f)
            w = 3 * w + this.co[s];
          return w;
        }
      },
      // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
      // BR edge is fully determined by the orientation of the other edges.
      flip: function(o) {
        var s, u, f, i, l, w;
        if (o != null) {
          for (l = 0, s = u = 10; u >= 0; s = --u)
            i = o % 2, o = o / 2 | 0, this.eo[s] = i, l += i;
          return this.eo[11] = (2 - l % 2) % 2, this;
        } else {
          for (w = 0, s = f = 0; f <= 10; s = ++f)
            w = 2 * w + this.eo[s];
          return w;
        }
      },
      // Parity of the corner permutation
      cornerParity: function() {
        var o, s, u, f, i, l, w, y, E;
        for (E = 0, o = u = i = I, l = me + 1; i <= l ? u <= l : u >= l; o = i <= l ? ++u : --u)
          for (s = f = w = o - 1, y = me; w <= y ? f <= y : f >= y; s = w <= y ? ++f : --f)
            this.cp[s] > this.cp[o] && E++;
        return E % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var o, s, u, f, i, l, w, y, E;
        for (E = 0, o = u = i = t, l = he + 1; i <= l ? u <= l : u >= l; o = i <= l ? ++u : --u)
          for (s = f = w = o - 1, y = he; w <= y ? f <= y : f >= y; s = w <= y ? ++f : --f)
            this.ep[s] > this.ep[o] && E++;
        return E % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: x("corners", me, k),
      // Permutation of the three edges UR, UF, UL
      URtoUL: x("edges", he, $e),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: x("edges", ue, F),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: x("edges", he, F),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: x("edges", X, t, !0)
    };
    for (h in pe)
      ee = pe[h], r.prototype[h] = ee;
    W = function(o, s, u) {
      var f, i, l, w, y, E, C, D, a, m, O;
      for (f = o === "corners" ? "cornerMultiply" : "edgeMultiply", i = new r(), O = [], l = E = 0, m = u - 1; 0 <= m ? E <= m : E >= m; l = 0 <= m ? ++E : --E) {
        for (i[s](l), w = [], y = D = 0; D <= 5; y = ++D) {
          for (C = r.moves[y], a = 0; a <= 2; ++a)
            i[f](C), w.push(i[s]());
          i[f](C);
        }
        O.push(w);
      }
      return O;
    }, g = (function() {
      var o, s;
      return o = new r(), s = new r(), function(u, f) {
        var i, l;
        for (o.URtoUL(u), s.UBtoDF(f), i = l = 0; l <= 7; i = ++l)
          if (o.ep[i] !== -1) {
            if (s.ep[i] !== -1)
              return -1;
            s.ep[i] = o.ep[i];
          }
        return s.URtoDF();
      };
    })(), re = 2187, Q = 2048, Z = 2, q = 11880, J = 495, z = 24, ne = 20160, oe = 20160, ce = 1320, se = 1320, r.moveTables = {
      parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
      twist: null,
      flip: null,
      FRtoBR: null,
      URFtoDLF: null,
      URtoDF: null,
      URtoUL: null,
      UBtoDF: null,
      mergeURtoDF: null
    }, U = {
      // name: [scope, size]
      twist: ["corners", re],
      flip: ["edges", Q],
      FRtoBR: ["edges", q],
      URFtoDLF: ["corners", ne],
      URtoDF: ["edges", oe],
      URtoUL: ["edges", ce],
      UBtoDF: ["edges", se],
      mergeURtoDF: []
    }, r.computeMoveTables = function(...o) {
      var s, u, f, i, l, w;
      for (o.length === 0 && (o = (function() {
        var y;
        y = [];
        for (f in U)
          y.push(f);
        return y;
      })()), u = 0, s = o.length; u < s; u++)
        w = o[u], this.moveTables[w] === null && (w === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var y, E, C, D;
          for (D = [], E = C = 0; C <= 335; E = ++C)
            D.push((function() {
              var a, m;
              for (m = [], y = a = 0; a <= 335; y = ++a)
                m.push(g(E, y));
              return m;
            })());
          return D;
        })() : ([i, l] = U[w], this.moveTables[w] = W(i, w, l)));
      return this;
    }, de = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], R = (function() {
      var o, s, u, f, i, l, w, y;
      for (y = [], s = u = 0; u <= 5; s = ++u) {
        for (f = [], o = i = 0; i <= 5; o = ++i)
          if (o !== s && o !== s - 3)
            for (w = l = 0; l <= 2; w = ++l)
              f.push(o * 3 + w);
        y.push(f);
      }
      return y;
    })(), Y = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], T = (function() {
      var o, s, u, f, i, l, w, y, E, C;
      for (C = [], s = f = 0; f <= 5; s = ++f) {
        for (i = [], o = l = 0; l <= 5; o = ++l)
          if (o !== s && o !== s - 3)
            for (E = o === 0 || o === 3 ? [0, 1, 2] : [1], w = 0, u = E.length; w < u; w++)
              y = E[w], i.push(o * 3 + y);
        C.push(i);
      }
      return C;
    })(), S = function(o, s, u) {
      var f, i, l;
      return f = s % 8, l = s >> 3, i = f << 2, u != null ? (o[l] &= ~(15 << i), o[l] |= u << i, u) : (o[l] & 15 << i) >>> i;
    }, H = function(o, s, u, f) {
      var i, l, w, y, E, C, D, a, m, O, b, $;
      for ($ = (function() {
        var V, K, fe;
        for (fe = [], V = 0, K = Math.ceil(s / 8) - 1; 0 <= K ? V <= K : V >= K; 0 <= K ? ++V : --V)
          fe.push(4294967295);
        return fe;
      })(), o === 1 ? a = de : a = Y, l = 0, S($, 0, l), w = 1; w !== s; ) {
        for (y = C = 0, b = s - 1; 0 <= b ? C <= b : C >= b; y = 0 <= b ? ++C : --C)
          if (S($, y) === l)
            for (i = u(y), O = 0, E = a.length; O < E; O++)
              D = a[O], m = f(i, D), S($, m) === 15 && (S($, m, l + 1), w++);
        l++;
      }
      return $;
    }, r.pruningTables = {
      sliceTwist: null,
      sliceFlip: null,
      sliceURFtoDLFParity: null,
      sliceURtoDFParity: null
    }, B = {
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
          ] = o, u = r.moveTables.FRtoBR[i * 24][s] / 24 | 0, f = r.moveTables.twist[l][s], f * J + u;
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
          ] = o, i = r.moveTables.FRtoBR[l * 24][s] / 24 | 0, f = r.moveTables.flip[u][s], f * J + i;
        }
      ],
      sliceURFtoDLFParity: [
        2,
        z * ne * Z,
        function(o) {
          return [
            o % 2,
            (o / 2 | 0) % z,
            (o / 2 | 0) / z | 0
          ];
        },
        function(o, s) {
          var u, f, i, l, w, y;
          return [
            w,
            y,
            u
          ] = o, f = r.moveTables.parity[w][s], i = r.moveTables.FRtoBR[y][s], l = r.moveTables.URFtoDLF[u][s], (l * z + i) * 2 + f;
        }
      ],
      sliceURtoDFParity: [
        2,
        z * oe * Z,
        function(o) {
          return [
            o % 2,
            (o / 2 | 0) % z,
            (o / 2 | 0) / z | 0
          ];
        },
        function(o, s) {
          var u, f, i, l, w, y;
          return [
            w,
            y,
            u
          ] = o, f = r.moveTables.parity[w][s], i = r.moveTables.FRtoBR[y][s], l = r.moveTables.URtoDF[u][s], (l * z + i) * 2 + f;
        }
      ]
    }, r.computePruningTables = function(...o) {
      var s, u, f, i, l;
      for (o.length === 0 && (o = (function() {
        var w;
        w = [];
        for (f in B)
          w.push(f);
        return w;
      })()), u = 0, s = o.length; u < s; u++)
        l = o[u], this.pruningTables[l] === null && (i = B[l], this.pruningTables[l] = H(...i));
      return this;
    }, r.initSolver = function() {
      return r.computeMoveTables(), r.computePruningTables();
    }, r.prototype.solveUpright = function(o = 22) {
      var s, u, f, i, l, w, y, E, C;
      return f = (function() {
        var D, a, m, O, b, $, V;
        for (a = ["U", "R", "F", "D", "L", "B"], $ = ["", "2", "'"], V = [], D = m = 0; m <= 5; D = ++m)
          for (b = O = 0; O <= 2; b = ++O)
            V.push(a[D] + $[b]);
        return V;
      })(), s = class {
        constructor(a) {
          this.parent = null, this.lastMove = null, this.depth = 0, a && this.init(a);
        }
        init(a) {
          return this.flip = a.flip(), this.twist = a.twist(), this.slice = a.FRtoBR() / z | 0, this.parity = a.cornerParity(), this.URFtoDLF = a.URFtoDLF(), this.FRtoBR = a.FRtoBR(), this.URtoUL = a.URtoUL(), this.UBtoDF = a.UBtoDF(), this;
        }
        solution() {
          return this.parent ? this.parent.solution() + f[this.lastMove] + " " : "";
        }
        //# Helpers
        move(a, m, O) {
          return r.moveTables[a][m][O];
        }
        pruning(a, m) {
          return S(r.pruningTables[a], m);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? R[this.lastMove / 3 | 0] : de;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var a, m;
          return a = this.pruning("sliceFlip", J * this.flip + this.slice), m = this.pruning("sliceTwist", J * this.twist + this.slice), p(a, m);
        }
        // Compute the next phase 1 state for the given move
        next1(a) {
          var m;
          return m = u.pop(), m.parent = this, m.lastMove = a, m.depth = this.depth + 1, m.flip = this.move("flip", this.flip, a), m.twist = this.move("twist", this.twist, a), m.slice = this.move("FRtoBR", this.slice * 24, a) / 24 | 0, m;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? T[this.lastMove / 3 | 0] : Y;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var a, m, O, b;
          return O = (z * this.URtoDF + this.FRtoBR) * Z + this.parity, a = this.pruning("sliceURtoDFParity", O), b = (z * this.URFtoDLF + this.FRtoBR) * Z + this.parity, m = this.pruning("sliceURFtoDLFParity", b), p(a, m);
        }
        // Initialize phase 2 coordinates
        init2(a = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), a))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(a) {
          var m;
          return m = u.pop(), m.parent = this, m.lastMove = a, m.depth = this.depth + 1, m.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, a), m.FRtoBR = this.move("FRtoBR", this.FRtoBR, a), m.parity = this.move("parity", this.parity, a), m.URtoDF = this.move("URtoDF", this.URtoDF, a), m;
        }
      }, E = null, l = function(D) {
        var a, m, O, b;
        for (a = 0, b = [], a = m = 1, O = o; (1 <= O ? m <= O : m >= O) && (i(D, a), E === null); a = 1 <= O ? ++m : --m)
          b.push(a++);
        return b;
      }, i = function(D, a) {
        var m, O, b, $, V, K, fe;
        if (a === 0) {
          if (D.minDist1() === 0 && (D.lastMove === null || (V = D.lastMove, te.call(Y, V) < 0)))
            return y(D);
        } else if (a > 0 && D.minDist1() <= a) {
          for (K = D.moves1(), fe = [], O = 0, m = K.length; O < m && (b = K[O], $ = D.next1(b), i($, a - 1), u.push($), E === null); O++)
            fe.push(void 0);
          return fe;
        }
      }, y = function(D) {
        var a, m, O, b;
        for (D.init2(), b = [], a = m = 1, O = o - D.depth; (1 <= O ? m <= O : m >= O) && (w(D, a), E === null); a = 1 <= O ? ++m : --m)
          b.push(a++);
        return b;
      }, w = function(D, a) {
        var m, O, b, $, V, K;
        if (a === 0) {
          if (D.minDist2() === 0)
            return E = D.solution();
        } else if (a > 0 && D.minDist2() <= a) {
          for (V = D.moves2(), K = [], O = 0, m = V.length; O < m && (b = V[O], $ = D.next2(b), w($, a - 1), u.push($), E === null); O++)
            K.push(void 0);
          return K;
        }
      }, u = (function() {
        var D, a, m;
        for (m = [], D = 0, a = o + 1; 0 <= a ? D <= a : D >= a; 0 <= a ? ++D : --D)
          m.push(new s());
        return m;
      })(), C = u.pop().init(this), l(C), u.push(C), E.length > 0 && (E = E.substring(0, E.length - 1)), E;
    }, _ = {
      U: 0,
      R: 1,
      F: 2,
      D: 3,
      L: 4,
      B: 5
    }, A = {
      0: "U",
      1: "R",
      2: "F",
      3: "D",
      4: "L",
      5: "B"
    }, r.prototype.solve = function(o = 22) {
      var s, u, f, i, l, w, y, E, C;
      for (s = this.clone(), E = s.upright(), s.move(E), w = new r().move(E).center, C = s.solveUpright(o), y = [], l = C.split(" "), f = 0, u = l.length; f < u; f++)
        i = l[f], y.push(A[w[_[i[0]]]]), i.length > 1 && (y[y.length - 1] += i[1]);
      return y.join(" ");
    }, r.scramble = function() {
      return r.inverse(r.random().solve());
    };
  }).call(We)), We;
}
var Qe, Ft;
function Yt() {
  return Ft || (Ft = 1, Qe = At(), Xt()), Qe;
}
var Ht = Yt();
const we = /* @__PURE__ */ Kt(Ht), Ze = 4294967296;
function Mt() {
  const e = globalThis.crypto;
  if (!(e != null && e.getRandomValues))
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  const t = new Uint32Array(1);
  return e.getRandomValues(t), t[0];
}
function ke(e, t = Mt) {
  if (!Number.isSafeInteger(e) || e < 1 || e > Ze)
    throw new RangeError("Invalid random integer range");
  const n = Math.floor(Ze / e) * e;
  for (; ; ) {
    const r = t();
    if (!Number.isInteger(r) || r < 0 || r >= Ze)
      throw new RangeError("Random source must return a uint32");
    if (r < n)
      return r % e;
  }
}
function Wt(e, t = Mt) {
  const n = [...e];
  for (let r = n.length - 1; r > 0; r--) {
    const c = ke(r + 1, t);
    [n[r], n[c]] = [n[c], n[r]];
  }
  return n;
}
function Ve(e, t) {
  if (!Number.isSafeInteger(e) || e < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return Wt(
    Array.from({ length: e }, (n, r) => r),
    t
  );
}
function ze(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++)
    for (let r = n + 1; r < e.length; r++)
      e[n] > e[r] && (t ^= 1);
  return t;
}
function Rt(e, t) {
  return !Array.isArray(e) || e.length !== t ? !1 : new Set(e).size === t && e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < t
  );
}
function Qt(e) {
  return Array.isArray(e) && e.length === 6 && e.every((t, n) => t === n);
}
function Ut(e, t, n) {
  return !Array.isArray(e) || e.length !== t || !e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < n
  ) ? !1 : e.reduce((r, c) => r + c, 0) % n === 0;
}
function Zt(e) {
  if (!e || typeof e != "object")
    return !1;
  const { center: t, cp: n, co: r, ep: c, eo: d } = e;
  return t !== void 0 && !Qt(t) || !Rt(n, 8) || !Rt(c, 12) || !Ut(r, 8, 3) || !Ut(d, 12, 2) ? !1 : ze(n) === ze(c);
}
function er(e) {
  if (!Zt(e))
    throw new Error("Invalid 3x3 cube state");
  return e;
}
function bt(e, t, n) {
  const r = [];
  let c = 0;
  for (let d = 0; d < e - 1; d++) {
    const F = ke(t, n);
    r.push(F), c += F;
  }
  return r.push((t - c % t) % t), r;
}
function tr(e) {
  let t, n;
  do
    t = Ve(8, e), n = Ve(12, e);
  while (ze(t) !== ze(n));
  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: t,
    co: bt(8, 3, e),
    ep: n,
    eo: bt(12, 2, e)
  };
}
let Ie;
async function rr() {
  Ie || (Ie = Promise.resolve().then(() => {
    we.initSolver();
  }));
  try {
    await Ie;
  } catch (e) {
    throw Ie = void 0, e;
  }
}
function ft(e) {
  return er(e), new we({
    center: e.center ?? [0, 1, 2, 3, 4, 5],
    cp: e.cp,
    co: e.co,
    ep: e.ep,
    eo: e.eo
  });
}
function nr(e) {
  const t = ft(e), n = t.solve();
  if (typeof n != "string" || !n.trim())
    throw new Error("Solver did not return a valid solution");
  if (!t.clone().move(n).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return n.trim();
}
function or(e) {
  return we.inverse(e).trim();
}
const ir = ["U", "R", "F", "D", "L", "B"], sr = ["", "2", "'"];
let et;
function cr() {
  if (!et) {
    const e = /* @__PURE__ */ new Set();
    e.add(new we().asString());
    for (const t of ir)
      for (const n of sr)
        e.add(
          new we().move(t + n).asString()
        );
    et = e;
  }
  return et;
}
function ur(e) {
  const t = ft(e);
  return !cr().has(t.asString());
}
function fr(e) {
  for (; ; ) {
    const t = tr(e);
    if (ur(t))
      return {
        stateData: t,
        cube: ft(t)
      };
  }
}
async function ar(e) {
  await rr();
  const { stateData: t, cube: n } = fr(e), r = nr(t), c = or(r);
  if (new we().move(c).asString() !== n.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!n.clone().move(r).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: c,
    moves: c.split(/\s+/),
    state: t
  };
}
const Tt = 8, ot = 6;
function lr(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++)
    for (let r = n + 1; r < e.length; r++)
      e[n] > e[r] && (t ^= 1);
  return t;
}
function pr(e, t) {
  return !Array.isArray(e) || e.length !== t ? !1 : new Set(e).size === t && e.every(
    (r) => Number.isInteger(r) && r >= 0 && r < t
  );
}
function hr(e) {
  return !Array.isArray(e) || e.length !== Tt || !e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < 3
  ) ? !1 : e[ot] === 0 && e.reduce((t, n) => t + n, 0) % 3 === 0;
}
function mr(e) {
  return !e || typeof e != "object" || !pr(e.cp, Tt) || !hr(e.co) ? !1 : e.cp[ot] === ot;
}
function Ge(e) {
  if (!mr(e))
    throw new Error("Invalid 2x2 cube state");
  return e;
}
const vr = [0, 1, 2, 3, 4, 5, 7], St = [0, 1, 2, 3, 4, 5, 7];
function dr(e) {
  const t = Ve(7, e), n = Array(8).fill(0);
  n[6] = 6;
  for (let r = 0; r < St.length; r++)
    n[St[r]] = vr[t[r]];
  return n;
}
function wr(e) {
  const t = Array(8).fill(0);
  let n = 0;
  for (let r = 0; r < 6; r++)
    t[r] = ke(3, e), n += t[r];
  return t[6] = 0, t[7] = (3 - n % 3) % 3, t;
}
function gr(e) {
  return Ge({
    cp: dr(e),
    co: wr(e)
  });
}
const Ce = [
  "U",
  "U2",
  "U'",
  "R",
  "R2",
  "R'",
  "F",
  "F2",
  "F'"
], yr = [2, 1, 0, 5, 4, 3, 8, 7, 6], Fr = [0, 0, 0, 1, 1, 1, 2, 2, 2], Nt = [0, 1, 2, 3, 4, 5, 7], xt = [0, 1, 2, 3, 4, 5, 7], tt = 5040, rt = 729, ve = Ce.length, Ct = [1, 1, 2, 6, 24, 120, 720, 5040];
let it = null;
function Rr(e) {
  if (Ge(e), e.cp[6] !== 6 || e.co[6] !== 0)
    throw new Error(
      "2×2 state is not reachable using only U, R and F turns"
    );
  return e;
}
function kt(e) {
  const t = xt.map((r) => {
    const c = Nt.indexOf(e[r]);
    if (c === -1)
      throw new Error("Invalid movable-corner permutation");
    return c;
  });
  let n = 0;
  for (let r = 0; r < 7; r++) {
    let c = 0;
    for (let d = r + 1; d < 7; d++)
      t[d] < t[r] && c++;
    n += c * Ct[6 - r];
  }
  return n;
}
function Ur(e) {
  const t = Array.from({ length: 7 }, (c, d) => d), n = [];
  for (let c = 0; c < 7; c++) {
    const d = Ct[6 - c], F = Math.floor(e / d);
    e %= d, n.push(t.splice(F, 1)[0]);
  }
  const r = Array(8).fill(0);
  r[6] = 6;
  for (let c = 0; c < 7; c++)
    r[xt[c]] = Nt[n[c]];
  return r;
}
function $t(e) {
  let t = 0;
  for (let n = 0; n < 6; n++)
    t = t * 3 + e[n];
  return t;
}
function br(e) {
  const t = Array(8).fill(0);
  let n = 0;
  for (let r = 5; r >= 0; r--)
    t[r] = e % 3, n += t[r], e = Math.floor(e / 3);
  return t[6] = 0, t[7] = (3 - n % 3) % 3, t;
}
function Sr(e, t) {
  return t.cp.map((n) => e[n]);
}
function Er(e, t) {
  return t.cp.map(
    (n, r) => (e[n] + t.co[r]) % 3
  );
}
function Et(e, t, n) {
  const r = new Int8Array(e);
  r.fill(-1), r[0] = 0;
  const c = new Int32Array(e);
  let d = 0, F = 1;
  for (c[0] = 0; d < F; ) {
    const L = c[d++], M = r[L] + 1;
    for (let k = 0; k < ve; k++) {
      const P = t[L * ve + k];
      r[P] === -1 && (r[P] = M, c[F++] = P);
    }
  }
  if (F !== e)
    throw new Error(
      `Incomplete ${n} pruning table: reached ${F} of ${e} coordinates`
    );
  return r;
}
function It() {
  if (it)
    return;
  const e = Ce.map((r) => {
    const c = new we();
    return c.move(r), {
      cp: Array.from(c.cp),
      co: Array.from(c.co)
    };
  }), t = new Uint16Array(
    tt * ve
  );
  for (let r = 0; r < tt; r++) {
    const c = Ur(r);
    for (let d = 0; d < ve; d++) {
      const F = Sr(c, e[d]);
      t[r * ve + d] = kt(F);
    }
  }
  const n = new Uint16Array(
    rt * ve
  );
  for (let r = 0; r < rt; r++) {
    const c = br(r);
    for (let d = 0; d < ve; d++) {
      const F = Er(c, e[d]);
      n[r * ve + d] = $t(F);
    }
  }
  it = {
    permutationMoves: t,
    orientationMoves: n,
    permutationDistances: Et(
      tt,
      t,
      "permutation"
    ),
    orientationDistances: Et(
      rt,
      n,
      "orientation"
    )
  };
}
function Dr() {
  It();
}
function Lr(e) {
  Ge(e);
  const t = Array.from({ length: 12 }, (n, r) => r);
  return lr(e.cp) !== 0 && ([t[0], t[1]] = [t[1], t[0]]), {
    center: [0, 1, 2, 3, 4, 5],
    cp: [...e.cp],
    co: [...e.co],
    ep: t,
    eo: Array(12).fill(0)
  };
}
function Br(e) {
  return new we(Lr(e));
}
function Or(e) {
  if (typeof e != "string")
    throw new TypeError("Solution must be a string");
  return (e.trim() === "" ? [] : e.trim().split(/\s+/)).reverse().map((n) => {
    const r = Ce.indexOf(n);
    if (r === -1)
      throw new RangeError(`Unsupported 2×2 move: "${n}"`);
    return Ce[yr[r]];
  }).join(" ");
}
function Ar(e) {
  Rr(e), It();
  const t = kt(e.cp), n = $t(e.co);
  if (t === 0 && n === 0)
    return "";
  const {
    permutationMoves: r,
    orientationMoves: c,
    permutationDistances: d,
    orientationDistances: F
  } = it, L = [], M = 20;
  function k(I, G, X, pe) {
    if (I === 0 && G === 0)
      return !0;
    if (Math.max(
      d[I],
      F[G]
    ) > X || X === 0)
      return !1;
    for (let q = 0; q < ve; q++) {
      const Z = Fr[q];
      if (Z === pe)
        continue;
      const J = r[I * ve + q], z = c[G * ve + q];
      if (L.push(q), k(J, z, X - 1, Z))
        return !0;
      L.pop();
    }
    return !1;
  }
  const P = Math.max(
    d[t],
    F[n]
  );
  for (let I = P; I <= M; I++)
    if (L.length = 0, k(t, n, I, -1))
      return L.map((G) => Ce[G]).join(" ");
  throw new Error(
    "Could not find a 2×2 solution within the search limit."
  );
}
const Mr = ["U", "R", "F", "D", "L", "B"], Tr = ["", "2", "'"];
let nt;
function st(e) {
  return `${Array.from(e.cp).join(",")}|${Array.from(e.co).join(",")}`;
}
function Nr() {
  if (!nt) {
    const e = /* @__PURE__ */ new Set();
    e.add(st({
      cp: [0, 1, 2, 3, 4, 5, 6, 7],
      co: Array(8).fill(0)
    }));
    for (const t of Mr)
      for (const n of Tr) {
        const r = new we().move(t + n);
        e.add(st({
          cp: r.cp,
          co: r.co
        }));
      }
    nt = e;
  }
  return nt;
}
function xr(e) {
  return Ge(e), !Nr().has(st(e));
}
function Cr(e) {
  for (; ; ) {
    const t = gr(e);
    if (xr(t))
      return {
        state: t,
        cube: Br(t)
      };
  }
}
function kr(e, t) {
  return Array.from(e.cp).every((n, r) => n === t.cp[r]) && Array.from(e.co).every((n, r) => n === t.co[r]);
}
async function $r(e) {
  await Dr();
  const { state: t, cube: n } = Cr(e), r = Ar(t), c = Or(r), d = new we().move(c);
  if (!kr(d, t))
    throw new Error(
      "2×2 scramble replay failed: generated corner state does not match target"
    );
  const F = n.clone().move(r);
  if (!Array.from(F.cp).every((L, M) => L === M) || !Array.from(F.co).every((L) => L === 0))
    throw new Error(
      "2×2 solution verification failed: corners did not return to identity"
    );
  return {
    event: "222",
    notation: c,
    moves: c.split(/\s+/),
    state: t
  };
}
function jt(e) {
  return Array.from({ length: e }, (t, n) => n);
}
const Ir = {
  U: 0,
  L: 1,
  R: 2,
  B: 3
}, Pt = {
  U: [0, 1, 2],
  L: [0, 4, 3],
  R: [1, 3, 5],
  B: [2, 4, 5]
};
function jr(e) {
  const t = jt(6), n = Array(6).fill(0), [r, c, d] = Pt[e];
  return t[r] = d, t[c] = r, t[d] = c, n[r] = 1, n[c] = 1, { src: t, flip: n };
}
function Pr(e) {
  const t = Array(6).fill(0);
  for (let r = 0; r < 6; r++)
    t[e.src[r]] = r;
  const n = t.map(
    (r) => e.flip[r]
  );
  return { src: t, flip: n };
}
const Pe = {};
for (const e of Object.keys(Pt))
  Pe[e] = jr(e), Pe[`${e}'`] = Pr(Pe[e]);
function at() {
  return {
    ep: jt(6),
    eo: Array(6).fill(0),
    tips: Array(4).fill(0)
  };
}
function _t(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++)
    for (let r = n + 1; r < e.length; r++)
      e[n] > e[r] && (t ^= 1);
  return t;
}
function _r(e, t) {
  return !Array.isArray(e) || e.length !== t || !e.every(
    (n) => Number.isInteger(n) && n >= 0 && n < t
  ) ? !1 : new Set(e).size === t;
}
function Vr(e) {
  return Array.isArray(e) && e.length === 6 && e.every((t) => t === 0 || t === 1) && e.reduce((t, n) => t + n, 0) % 2 === 0;
}
function zr(e) {
  return Array.isArray(e) && e.length === 4 && e.every(
    (t) => Number.isInteger(t) && t >= 0 && t < 3
  );
}
function qr(e) {
  return !e || typeof e != "object" ? !1 : _r(e.ep, 6) && _t(e.ep) === 0 && Vr(e.eo) && zr(e.tips);
}
function lt(e) {
  if (!qr(e))
    throw new Error("Invalid Pyraminx state");
  return e;
}
function pt(e, t) {
  const n = /^([ULRBulrb])('?)$/.exec(t);
  if (!n)
    throw new RangeError(`Unsupported Pyraminx move: "${t}"`);
  const [, r, c] = n, d = r.toUpperCase(), F = Ir[d], L = c ? 2 : 1, M = {
    ep: [...e.ep],
    eo: [...e.eo],
    tips: [...e.tips]
  };
  if (r === r.toLowerCase())
    return M.tips[F] = (M.tips[F] + L) % 3, M;
  const k = Pe[t];
  return M.ep = k.src.map((P) => e.ep[P]), M.eo = k.src.map(
    (P, I) => e.eo[P] ^ k.flip[I]
  ), M.tips[F] = (M.tips[F] + L) % 3, M;
}
function ct(e, t) {
  return (t.trim() === "" ? [] : t.trim().split(/\s+/)).reduce(
    (r, c) => pt(r, c),
    {
      ep: [...e.ep],
      eo: [...e.eo],
      tips: [...e.tips]
    }
  );
}
function Jr(e) {
  for (; ; ) {
    const t = Ve(6, e);
    if (_t(t) === 0)
      return t;
  }
}
function Kr(e) {
  const t = [];
  let n = 0;
  for (let r = 0; r < 5; r++) {
    const c = ke(2, e);
    t.push(c), n += c;
  }
  return t.push(n % 2), t;
}
function Gr(e) {
  return Array.from(
    { length: 4 },
    () => ke(3, e)
  );
}
function Xr(e) {
  return {
    ep: Jr(e),
    eo: Kr(e),
    tips: Gr(e)
  };
}
const Vt = [
  "U",
  "U'",
  "L",
  "L'",
  "R",
  "R'",
  "B",
  "B'"
], Dt = 11520;
let qe;
function xe(e) {
  return `${e.ep.join(",")}|${e.eo.join(",")}`;
}
function Je(e) {
  return {
    ep: [...e.ep],
    eo: [...e.eo],
    tips: [0, 0, 0, 0]
  };
}
function ht() {
  if (qe)
    return;
  const e = at(), t = /* @__PURE__ */ new Map(), n = [Je(e)];
  t.set(xe(e), 0);
  let r = 0;
  for (; r < n.length; ) {
    const c = n[r++], d = xe(c), F = t.get(d) + 1;
    for (const L of Vt) {
      const M = Je(pt(c, L)), k = xe(M);
      t.has(k) || (t.set(k, F), n.push(M));
    }
  }
  if (t.size !== Dt)
    throw new Error(
      `Incomplete Pyraminx distance table: reached ${t.size} of ${Dt} edge states`
    );
  qe = t;
}
async function Yr() {
  ht();
}
function mt(e) {
  lt(e), ht();
  const t = qe.get(xe(e));
  if (t === void 0)
    throw new Error("Pyraminx state is not reachable by face turns");
  return t;
}
function Hr(e) {
  lt(e), ht();
  let t = Je(e), n = mt(e);
  const r = [];
  for (; n > 0; ) {
    let c = !1;
    for (const d of Vt) {
      const F = Je(pt(t, d)), L = qe.get(xe(F));
      if (L === n - 1) {
        r.push(d), t = F, n = L, c = !0;
        break;
      }
    }
    if (!c)
      throw new Error("Pyraminx solver could not find a shorter state");
  }
  return r.join(" ");
}
function Wr(e) {
  if (typeof e != "string")
    throw new TypeError("Solution must be a string");
  return e.trim() === "" ? "" : e.trim().split(/\s+/).reverse().map((t) => t.endsWith("'") ? t.slice(0, -1) : `${t}'`).join(" ");
}
const Qr = 6, Lt = ["u", "l", "r", "b"];
function Zr(e, t) {
  return e.ep.every((n, r) => n === t.ep[r]) && e.eo.every((n, r) => n === t.eo[r]) && e.tips.every((n, r) => n === t.tips[r]);
}
function en(e) {
  return lt(e), mt(e) >= Qr;
}
function tn(e) {
  for (; ; ) {
    const t = Xr(e);
    if (en(t))
      return {
        state: t,
        distance: mt(t)
      };
  }
}
function rn(e, t) {
  const n = ct(at(), e), r = [];
  for (let c = 0; c < 4; c++) {
    const d = (t.tips[c] - n.tips[c] + 3) % 3;
    d === 1 ? r.push(Lt[c]) : d === 2 && r.push(`${Lt[c]}'`);
  }
  return [e, ...r].filter(Boolean).join(" ");
}
async function nn(e) {
  await Yr();
  const { state: t } = tn(e), n = Hr(t), r = Wr(n), c = rn(r, t), d = ct(at(), c);
  if (!Zr(d, t))
    throw new Error(
      "Pyraminx scramble replay failed: generated state does not match target"
    );
  const F = ct(
    { ...t, tips: [0, 0, 0, 0] },
    n
  );
  if (!F.ep.every((L, M) => L === M) || !F.eo.every((L) => L === 0))
    throw new Error("Pyraminx solution verification failed");
  return {
    event: "pyram",
    notation: c,
    moves: c.split(/\s+/),
    state: t
  };
}
const Bt = [-3, -1, 1, 3], Ke = ["U", "R", "F", "D", "L", "B"], on = Object.freeze({
  U: [0, 1, 0],
  R: [1, 0, 0],
  F: [0, 0, 1],
  D: [0, -1, 0],
  L: [-1, 0, 0],
  B: [0, 0, -1]
});
function sn(e, t) {
  return `${e.join(",")}|${t.join(",")}`;
}
function cn() {
  const e = [];
  for (const t of Ke) {
    const n = on[t];
    for (const r of Bt)
      for (const c of Bt) {
        let d;
        switch (t) {
          case "U":
            d = [r, 3, c];
            break;
          case "R":
            d = [3, c, r];
            break;
          case "F":
            d = [r, c, 3];
            break;
          case "D":
            d = [r, -3, -c];
            break;
          case "L":
            d = [-3, c, -r];
            break;
          case "B":
            d = [-r, c, -3];
            break;
        }
        e.push(
          Object.freeze({
            position: Object.freeze(d),
            normal: Object.freeze([...n]),
            face: t,
            key: sn(d, n)
          })
        );
      }
  }
  return Object.freeze(e);
}
const ye = cn();
new Map(
  ye.map((e, t) => [e.key, t])
);
const un = ye.length;
function fn() {
  return ye.map((e) => e.face);
}
function zt(e) {
  if (!Array.isArray(e) || e.length !== un)
    return !1;
  const t = Object.fromEntries(
    Ke.map((n) => [n, 0])
  );
  for (const n of e) {
    if (!Object.hasOwn(t, n))
      return !1;
    t[n]++;
  }
  return Ke.every((n) => t[n] === 16);
}
function an(e) {
  if (!zt(e))
    throw new TypeError(
      "Invalid 4x4 facelet state: expected 96 stickers with exactly 16 stickers of each face colour"
    );
  return e;
}
function Fn(e) {
  return zt(e) ? e.every(
    (t, n) => t === ye[n].face
  ) : !1;
}
const Ot = [-1, 0, 1];
function qt(e, t) {
  return `${e.join(",")}|${t.join(",")}`;
}
function ln() {
  const e = [];
  for (const t of Ke) {
    const n = ye.find(
      (r) => r.face === t
    ).normal;
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        const d = Ot[r], F = Ot[c];
        let L;
        switch (t) {
          case "U":
            L = [F, 1, d];
            break;
          case "R":
            L = [1, -d, -F];
            break;
          case "F":
            L = [F, -d, 1];
            break;
          case "D":
            L = [F, -1, -d];
            break;
          case "L":
            L = [-1, -d, F];
            break;
          case "B":
            L = [-F, -d, -1];
            break;
        }
        e.push({
          face: t,
          position: L,
          normal: n,
          key: qt(L, n)
        });
      }
  }
  return e;
}
const _e = ln(), pn = new Map(
  _e.map((e, t) => [e.key, t])
);
function hn(e) {
  return e === -3 ? -1 : e === 3 ? 1 : 0;
}
function mn(e) {
  an(e);
  const t = _e.map(() => []);
  for (let r = 0; r < ye.length; r++) {
    const c = ye[r], d = c.position.map(hn), F = qt(d, c.normal), L = pn.get(F);
    if (L === void 0)
      throw new Error("Could not map a 4x4 sticker to the 3x3 layout");
    t[L].push(e[r]);
  }
  const n = [];
  for (let r = 0; r < _e.length; r++) {
    const c = _e[r], d = t[r];
    if (d.length === 0)
      throw new Error(`Missing stickers for reduced ${c.face} facelet`);
    const F = d[0];
    if (!d.every((M) => M === F))
      throw new Error(
        `4x4 is not reduced: stickers disagree at ${c.face} facelet ${c.position.join(",")}`
      );
    if (c.position.filter(
      (M) => M === 0
    ).length === 2 && F !== c.face)
      throw new Error(
        `4x4 centres are not solved: expected ${c.face}, got ${F}`
      );
    n.push(F);
  }
  return n.join("");
}
function Rn() {
  return mn(fn());
}
function vn(e) {
  if (typeof e != "string" || !/^[a-z0-9]+$/.test(e))
    throw new TypeError(
      "Event ID must be a non-empty lowercase alphanumeric string"
    );
}
function dn(e) {
  if (typeof e != "function")
    throw new TypeError("Event generator must be a function");
}
function wn() {
  const e = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(t, n) {
      if (vn(t), dn(n), e.has(t))
        throw new RangeError(`Event "${t}" is already registered`);
      e.set(t, n);
    },
    get(t) {
      return e.get(t);
    },
    list() {
      return Object.freeze([...e.keys()]);
    }
  });
}
const ut = wn();
let Jt = Object.freeze([]);
function vt(e, t) {
  ut.register(e, t), Jt = ut.list();
}
function gn(e) {
  return ut.get(e);
}
vt(
  "333",
  ({ randomWord: e } = {}) => ar(e)
);
vt(
  "222",
  ({ randomWord: e } = {}) => $r(e)
);
vt(
  "pyram",
  ({ randomWord: e } = {}) => nn(e)
);
async function Un(e = "333", t = {}) {
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new TypeError("options must be an object");
  if (t.randomWord !== void 0 && typeof t.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  const n = gn(e);
  if (!n)
    throw new RangeError(
      `Unsupported event "${e}". Supported events: ${Jt.join(", ")}`
    );
  return await n(t);
}
export {
  Jt as events,
  Un as generate,
  Fn as isSolved444State,
  zt as isValid444State,
  vt as registerEvent,
  fn as solved444State,
  Rn as solvedReduced3x3Facelets,
  mn as toReduced3x3Facelets
};
