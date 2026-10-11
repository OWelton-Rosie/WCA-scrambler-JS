function rt(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Pe = { exports: {} }, nt = Pe.exports, We;
function Ze() {
  return We || (We = 1, (function(u) {
    (function() {
      var F, d, c, x, oe, O, ie, se, H, ue, K, le, Q, me, $, Z, fe, _, j, W, ee, G, X, te, re, ce, ae, ge, Ee, Re, he, pe, ve;
      [j, _, me, oe, fe, F] = [0, 1, 2, 3, 4, 5], [ae, X, re, ee, H, K, ie, Q] = [0, 1, 2, 3, 4, 5, 6, 7], [ce, G, te, W, le, se, ue, O, Z, $, d, c] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [Ee, he, ve] = (function() {
        var A, q, J, B, C, h;
        return h = function(f) {
          return f - 1;
        }, C = function(f) {
          return h(9) + f;
        }, J = function(f) {
          return C(9) + f;
        }, q = function(f) {
          return J(9) + f;
        }, B = function(f) {
          return q(9) + f;
        }, A = function(f) {
          return B(9) + f;
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
              h(9),
              C(1),
              J(3)
            ],
            [
              h(7),
              J(1),
              B(3)
            ],
            [
              h(1),
              B(1),
              A(3)
            ],
            [
              h(3),
              A(1),
              C(3)
            ],
            [
              q(3),
              J(9),
              C(7)
            ],
            [
              q(1),
              B(9),
              J(7)
            ],
            [
              q(7),
              A(9),
              B(7)
            ],
            [
              q(9),
              C(9),
              A(7)
            ]
          ],
          // Edges
          [
            [
              h(6),
              C(2)
            ],
            [
              h(8),
              J(2)
            ],
            [
              h(4),
              B(2)
            ],
            [
              h(2),
              A(2)
            ],
            [
              q(6),
              C(8)
            ],
            [
              q(2),
              J(8)
            ],
            [
              q(4),
              B(8)
            ],
            [
              q(8),
              A(8)
            ],
            [
              J(6),
              C(4)
            ],
            [
              J(4),
              B(6)
            ],
            [
              A(6),
              B(4)
            ],
            [
              A(4),
              C(6)
            ]
          ]
        ];
      })(), ge = ["U", "R", "F", "D", "L", "B"], Re = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], pe = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], x = (function() {
        var A, q, J;
        class B {
          constructor(h) {
            h != null ? this.init(h) : this.identity(), this.newCenter = (function() {
              var f, l;
              for (l = [], f = 0; f <= 5; ++f)
                l.push(0);
              return l;
            })(), this.newCp = (function() {
              var f, l;
              for (l = [], f = 0; f <= 7; ++f)
                l.push(0);
              return l;
            })(), this.newEp = (function() {
              var f, l;
              for (l = [], f = 0; f <= 11; ++f)
                l.push(0);
              return l;
            })(), this.newCo = (function() {
              var f, l;
              for (l = [], f = 0; f <= 7; ++f)
                l.push(0);
              return l;
            })(), this.newEo = (function() {
              var f, l;
              for (l = [], f = 0; f <= 11; ++f)
                l.push(0);
              return l;
            })();
          }
          init(h) {
            return this.center = h.center.slice(0), this.co = h.co.slice(0), this.ep = h.ep.slice(0), this.cp = h.cp.slice(0), this.eo = h.eo.slice(0);
          }
          identity() {
            return this.center = [0, 1, 2, 3, 4, 5], this.cp = [0, 1, 2, 3, 4, 5, 6, 7], this.co = (function() {
              var h, f;
              for (f = [], h = 0; h <= 7; ++h)
                f.push(0);
              return f;
            })(), this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.eo = (function() {
              var h, f;
              for (f = [], h = 0; h <= 11; ++h)
                f.push(0);
              return f;
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
            var h, f, l, v, w, R, S, N, U, y, M;
            for (M = [], l = v = 0; v <= 5; l = ++v)
              M[9 * l + 4] = ge[this.center[l]];
            for (l = w = 0; w <= 7; l = ++w)
              for (h = this.cp[l], U = this.co[l], S = R = 0; R <= 2; S = ++R)
                M[he[l][(S + U) % 3]] = Re[h][S];
            for (l = N = 0; N <= 11; l = ++N)
              for (f = this.ep[l], U = this.eo[l], S = y = 0; y <= 1; S = ++y)
                M[ve[l][(S + U) % 2]] = pe[f][S];
            return M.join("");
          }
          static fromString(h) {
            var f, l, v, w, R, S, N, U, y, M, E, z, V, e;
            for (v = new B(), w = S = 0; S <= 5; w = ++S)
              for (R = N = 0; N <= 5; R = ++N)
                h[9 * w + 4] === ge[R] && (v.center[w] = R);
            for (w = U = 0; U <= 7; w = ++U) {
              for (M = y = 0; y <= 2 && !((e = h[he[w][M]]) === "U" || e === "D"); M = ++y)
                ;
              for (f = h[he[w][(M + 1) % 3]], l = h[he[w][(M + 2) % 3]], R = E = 0; E <= 7; R = ++E)
                f === Re[R][1] && l === Re[R][2] && (v.cp[w] = R, v.co[w] = M % 3);
            }
            for (w = z = 0; z <= 11; w = ++z)
              for (R = V = 0; V <= 11; R = ++V) {
                if (h[ve[w][0]] === pe[R][0] && h[ve[w][1]] === pe[R][1]) {
                  v.ep[w] = R, v.eo[w] = 0;
                  break;
                }
                if (h[ve[w][0]] === pe[R][1] && h[ve[w][1]] === pe[R][0]) {
                  v.ep[w] = R, v.eo[w] = 1;
                  break;
                }
              }
            return v;
          }
          clone() {
            return new B(this.toJSON());
          }
          // A class method returning a new random cube
          static random() {
            return new B().randomize();
          }
          isSolved() {
            var h, f, l, v, w, R, S;
            for (l = this.clone(), l.move(l.upright()), f = w = 0; w <= 5; f = ++w)
              if (l.center[f] !== f)
                return !1;
            for (h = R = 0; R <= 7; h = ++R)
              if (l.cp[h] !== h || l.co[h] !== 0)
                return !1;
            for (v = S = 0; S <= 11; v = ++S)
              if (l.ep[v] !== v || l.eo[v] !== 0)
                return !1;
            return !0;
          }
          // Multiply this Cube with another Cube, restricted to centers.
          centerMultiply(h) {
            var f, l, v;
            for (v = l = 0; l <= 5; v = ++l)
              f = h.center[v], this.newCenter[v] = this.center[f];
            return [this.center, this.newCenter] = [this.newCenter, this.center], this;
          }
          // Multiply this Cube with another Cube, restricted to corners.
          cornerMultiply(h) {
            var f, l, v;
            for (v = l = 0; l <= 7; v = ++l)
              f = h.cp[v], this.newCp[v] = this.cp[f], this.newCo[v] = (this.co[f] + h.co[v]) % 3;
            return [this.cp, this.newCp] = [this.newCp, this.cp], [this.co, this.newCo] = [this.newCo, this.co], this;
          }
          // Multiply this Cube with another Cube, restricted to edges
          edgeMultiply(h) {
            var f, l, v;
            for (v = l = 0; l <= 11; v = ++l)
              f = h.ep[v], this.newEp[v] = this.ep[f], this.newEo[v] = (this.eo[f] + h.eo[v]) % 2;
            return [this.ep, this.newEp] = [this.newEp, this.ep], [this.eo, this.newEo] = [this.newEo, this.eo], this;
          }
          // Multiply this cube with another Cube
          multiply(h) {
            return this.centerMultiply(h), this.cornerMultiply(h), this.edgeMultiply(h), this;
          }
          move(h) {
            var f, l, v, w, R, S, N, U;
            for (N = J(h), l = 0, w = N.length; l < w; l++)
              for (R = N[l], f = R / 3 | 0, S = R % 3, v = 0, U = S; 0 <= U ? v <= U : v >= U; 0 <= U ? ++v : --v)
                this.multiply(B.moves[f]);
            return this;
          }
          upright() {
            var h, f, l, v, w, R;
            for (h = this.clone(), R = [], f = v = 0; v <= 5 && h.center[f] !== me; f = ++v)
              ;
            switch (f) {
              case oe:
                R.push("x");
                break;
              case j:
                R.push("x'");
                break;
              case F:
                R.push("x2");
                break;
              case _:
                R.push("y");
                break;
              case fe:
                R.push("y'");
            }
            for (R.length && h.move(R[0]), l = w = 0; w <= 5 && h.center[l] !== j; l = ++w)
              ;
            switch (l) {
              case fe:
                R.push("z");
                break;
              case _:
                R.push("z'");
                break;
              case oe:
                R.push("z2");
            }
            return R.join(" ");
          }
          static inverse(h) {
            var f, l, v, w, R, S, N;
            if (S = (function() {
              var U, y, M, E;
              for (M = J(h), E = [], U = 0, y = M.length; U < y; U++)
                w = M[U], f = w / 3 | 0, R = w % 3, E.push(f * 3 + -(R - 1) + 1);
              return E;
            })(), S.reverse(), typeof h == "string") {
              for (N = "", l = 0, v = S.length; l < v; l++)
                w = S[l], f = w / 3 | 0, R = w % 3, N += A[f], R === 1 ? N += "2" : R === 2 && (N += "'"), N += " ";
              return N.substring(0, N.length - 1);
            } else return h.length != null ? S : S[0];
          }
        }
        return B.prototype.randomize = (function() {
          var C, h, f, l, v, w, R, S, N;
          return w = function(U, y) {
            return U + Math.floor(Math.random() * (y - U + 1));
          }, N = function(U) {
            var y, M;
            for (y = U.length; y !== 0; )
              M = w(0, y - 1), y -= 1, U[y], [U[y], U[M]] = [U[M], U[y]];
          }, l = function(U) {
            var y, M, E, z, V, e, r;
            for (V = 0, r = (function() {
              var n, o, t;
              for (t = [], n = 0, o = U.length - 1; 0 <= o ? n <= o : n >= o; 0 <= o ? ++n : --n)
                t.push(!1);
              return t;
            })(); ; ) {
              for (y = -1, E = z = 0, e = U.length - 1; 0 <= e ? z <= e : z >= e; E = 0 <= e ? ++z : --z)
                if (!r[E]) {
                  y = E;
                  break;
                }
              if (y === -1)
                break;
              for (M = 0; !r[y]; )
                r[y] = !0, M++, y = U[y];
              V += M + 1;
            }
            return V;
          }, C = function(U, y) {
            var M;
            return M = l(y) + l(U), M % 2 === 0;
          }, f = function(U, y) {
            for (N(y), N(U); !C(U, y); )
              N(y), N(U);
          }, R = function(U, y) {
            var M, E, z, V;
            for (z = 0, M = E = 0, V = U.length - 1; 0 <= V ? E <= V : E >= V; M = 0 <= V ? ++E : --E)
              z += U[M] = w(0, y - 1);
          }, v = function(U, y) {
            return U.reduce(function(M, E) {
              return M + E;
            }) % y === 0;
          }, h = function(U, y) {
            for (R(U, 3); !v(U, 3); )
              R(U, 3);
            for (R(y, 2); !v(y, 2); )
              R(y, 2);
          }, S = function() {
            return f(this.cp, this.ep), h(this.co, this.eo), this;
          }, S;
        })(), B.moves = [
          {
            // U
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              ee,
              ae,
              X,
              re,
              H,
              K,
              ie,
              Q
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
              W,
              ce,
              G,
              te,
              le,
              se,
              ue,
              O,
              Z,
              $,
              d,
              c
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
              H,
              X,
              re,
              ae,
              Q,
              K,
              ie,
              ee
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
              Z,
              G,
              te,
              W,
              c,
              se,
              ue,
              O,
              le,
              $,
              d,
              ce
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
              X,
              K,
              re,
              ee,
              ae,
              H,
              ie,
              Q
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
              ce,
              $,
              te,
              W,
              le,
              Z,
              ue,
              O,
              G,
              se,
              d,
              c
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
              X,
              re,
              ee,
              K,
              ie,
              Q,
              H
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
              G,
              te,
              W,
              se,
              ue,
              O,
              le,
              Z,
              $,
              d,
              c
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
              re,
              ie,
              ee,
              H,
              X,
              K,
              Q
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
              ce,
              G,
              d,
              W,
              le,
              se,
              $,
              O,
              Z,
              te,
              ue,
              c
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
              X,
              ee,
              Q,
              H,
              K,
              re,
              ie
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
              ce,
              G,
              te,
              c,
              le,
              se,
              ue,
              d,
              Z,
              $,
              W,
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
              j,
              me,
              fe,
              oe,
              F,
              _
            ],
            cp: [
              ae,
              X,
              re,
              ee,
              H,
              K,
              ie,
              Q
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
              G,
              te,
              W,
              le,
              se,
              ue,
              O,
              $,
              d,
              c,
              Z
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
              F,
              _,
              j,
              me,
              fe,
              oe
            ],
            cp: [
              ae,
              X,
              re,
              ee,
              H,
              K,
              ie,
              Q
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
              W,
              te,
              O,
              le,
              G,
              ue,
              se,
              Z,
              $,
              d,
              c
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
              fe,
              j,
              me,
              _,
              oe,
              F
            ],
            cp: [
              ae,
              X,
              re,
              ee,
              H,
              K,
              ie,
              Q
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
              te,
              G,
              ue,
              W,
              ce,
              se,
              le,
              O,
              Z,
              $,
              d,
              c
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
        ], q = {
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
        }, A = {
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
        }, J = function(C) {
          var h, f, l, v, w, R, S;
          if (typeof C == "string") {
            for (R = C.split(/\s+/), S = [], h = 0, f = R.length; h < f; h++)
              if (v = R[h], v.length !== 0) {
                if (v.length > 2)
                  throw new Error(`Invalid move: ${v}`);
                if (l = q[v[0]], l === void 0)
                  throw new Error(`Invalid move: ${v}`);
                if (v.length === 1)
                  w = 0;
                else if (v[1] === "2")
                  w = 1;
                else if (v[1] === "'")
                  w = 2;
                else
                  throw new Error(`Invalid move: ${v}`);
                S.push(l * 3 + w);
              }
            return S;
          } else return C.length != null ? C : [C];
        }, B.moves.push(new B().move("R M' L'").toJSON()), B.moves.push(new B().move("U E' D'").toJSON()), B.moves.push(new B().move("F S B'").toJSON()), B.moves.push(new B().move("U E'").toJSON()), B.moves.push(new B().move("R M'").toJSON()), B.moves.push(new B().move("F S").toJSON()), B.moves.push(new B().move("D E").toJSON()), B.moves.push(new B().move("L M").toJSON()), B.moves.push(new B().move("B S'").toJSON()), B;
      }).call(this), u !== null ? u.exports = x : this.Cube = x;
    }).call(nt);
  })(Pe)), Pe.exports;
}
var _e = {}, Ge;
function ot() {
  return Ge || (Ge = 1, (function() {
    var u, F, d, c, x, oe, O, ie, se, H, ue, K, le, Q, me, $, Z, fe, _, j, W, ee, G, X, te, re, ce, ae, ge, Ee, Re, he, pe, ve, A, q, J, B, C, h, f, l, v, w, R, S, N, U, y, M, E, z, V = [].indexOf;
    c = this.Cube || Ze(), [pe, ge, Re, ce, ie, H, oe, K] = [0, 1, 2, 3, 4, 5, 6, 7], [he, ae, Ee, re, ue, O, se, x, Q, le, u, F] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], d = function(e, r) {
      var n, o, t;
      if (e < r)
        return 0;
      for (r > e / 2 && (r = e - r), t = 1, n = e, o = 1; n !== e - r; )
        t *= n, t /= o, n--, o++;
      return t;
    }, h = function(e) {
      var r, n, o, t;
      for (r = 1, n = o = 2, t = e; 2 <= t ? o <= t : o >= t; n = 2 <= t ? ++o : --o)
        r *= n;
      return r;
    }, l = function(e, r) {
      return e > r ? e : r;
    }, M = function(e, r, n) {
      var o, t, s, p, m;
      for (m = e[r], o = t = s = r, p = n - 1; s <= p ? t <= p : t >= p; o = s <= p ? ++t : --t)
        e[o] = e[o + 1];
      return e[n] = m;
    }, E = function(e, r, n) {
      var o, t, s, p, m;
      for (m = e[n], o = t = s = n, p = r + 1; s <= p ? t <= p : t >= p; o = s <= p ? ++t : --t)
        e[o] = e[o - 1];
      return e[r] = m;
    }, N = function(e, r, n, o = !1) {
      var t, s, p, m, D, k;
      return m = n - r, p = h(m + 1), e === "corners" ? (s = 7, k = "cp") : (s = 11, k = "ep"), D = (function() {
        var L, i, a;
        for (a = [], t = L = 0, i = m; 0 <= i ? L <= i : L >= i; t = 0 <= i ? ++L : --L)
          a.push(0);
        return a;
      })(), function(L) {
        var i, a, b, g, T, P, I, ne, Fe, Ue, de, De, je, Le, ye, Ie, be, Oe, Ve, Be, $e, Se, Me, Ne, Y, ke, Te;
        if (L != null) {
          for (t = P = 0, de = m; 0 <= de ? P <= de : P >= de; t = 0 <= de ? ++P : --P)
            D[t] = t + r;
          for (a = L % p, i = L / p | 0, Fe = this[k], t = I = 0, De = s; 0 <= De ? I <= De : I >= De; t = 0 <= De ? ++I : --I)
            Fe[t] = -1;
          for (g = ne = 1, Le = m; 1 <= Le ? ne <= Le : ne >= Le; g = 1 <= Le ? ++ne : --ne)
            for (T = a % (g + 1), a = a / (g + 1) | 0; T > 0; )
              E(D, 0, g), T--;
          if (Y = m, o)
            for (g = Ue = 0, ye = s; 0 <= ye ? Ue <= ye : Ue >= ye; g = 0 <= ye ? ++Ue : --Ue)
              b = d(s - g, Y + 1), i - b >= 0 && (Fe[g] = D[m - Y], i -= b, Y--);
          else
            for (g = Se = Ie = s; Ie <= 0 ? Se <= 0 : Se >= 0; g = Ie <= 0 ? ++Se : --Se)
              b = d(g, Y + 1), i - b >= 0 && (Fe[g] = D[Y], i -= b, Y--);
          return this;
        } else {
          for (Fe = this[k], t = Me = 0, be = m; 0 <= be ? Me <= be : Me >= be; t = 0 <= be ? ++Me : --Me)
            D[t] = -1;
          if (i = a = Y = 0, o)
            for (g = Ne = Oe = s; Oe <= 0 ? Ne <= 0 : Ne >= 0; g = Oe <= 0 ? ++Ne : --Ne)
              r <= (Ve = Fe[g]) && Ve <= n && (i += d(s - g, Y + 1), D[m - Y] = Fe[g], Y++);
          else
            for (g = ke = 0, Be = s; 0 <= Be ? ke <= Be : ke >= Be; g = 0 <= Be ? ++ke : --ke)
              r <= ($e = Fe[g]) && $e <= n && (i += d(g, Y + 1), D[Y] = Fe[g], Y++);
          for (g = Te = je = m; je <= 0 ? Te <= 0 : Te >= 0; g = je <= 0 ? ++Te : --Te) {
            for (T = 0; D[g] !== r + g; )
              M(D, 0, g), T++;
            a = (g + 1) * a + T;
          }
          return i * p + a;
        }
      };
    }, me = {
      // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
      // the DRB corner is fully determined by the orientation of the other
      // corners.
      twist: function(e) {
        var r, n, o, t, s, p;
        if (e != null) {
          for (s = 0, r = n = 6; n >= 0; r = --n)
            t = e % 3, e = e / 3 | 0, this.co[r] = t, s += t;
          return this.co[7] = (3 - s % 3) % 3, this;
        } else {
          for (p = 0, r = o = 0; o <= 6; r = ++o)
            p = 3 * p + this.co[r];
          return p;
        }
      },
      // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
      // BR edge is fully determined by the orientation of the other edges.
      flip: function(e) {
        var r, n, o, t, s, p;
        if (e != null) {
          for (s = 0, r = n = 10; n >= 0; r = --n)
            t = e % 2, e = e / 2 | 0, this.eo[r] = t, s += t;
          return this.eo[11] = (2 - s % 2) % 2, this;
        } else {
          for (p = 0, r = o = 0; o <= 10; r = ++o)
            p = 2 * p + this.eo[r];
          return p;
        }
      },
      // Parity of the corner permutation
      cornerParity: function() {
        var e, r, n, o, t, s, p, m, D;
        for (D = 0, e = n = t = K, s = pe + 1; t <= s ? n <= s : n >= s; e = t <= s ? ++n : --n)
          for (r = o = p = e - 1, m = pe; p <= m ? o <= m : o >= m; r = p <= m ? ++o : --o)
            this.cp[r] > this.cp[e] && D++;
        return D % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var e, r, n, o, t, s, p, m, D;
        for (D = 0, e = n = t = F, s = he + 1; t <= s ? n <= s : n >= s; e = t <= s ? ++n : --n)
          for (r = o = p = e - 1, m = he; p <= m ? o <= m : o >= m; r = p <= m ? ++o : --o)
            this.ep[r] > this.ep[e] && D++;
        return D % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: N("corners", pe, H),
      // Permutation of the three edges UR, UF, UL
      URtoUL: N("edges", he, Ee),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: N("edges", re, O),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: N("edges", he, O),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: N("edges", Q, F, !0)
    };
    for (f in me)
      z = me[f], c.prototype[f] = z;
    q = function(e, r, n) {
      var o, t, s, p, m, D, k, L, i, a, b;
      for (o = e === "corners" ? "cornerMultiply" : "edgeMultiply", t = new c(), b = [], s = D = 0, a = n - 1; 0 <= a ? D <= a : D >= a; s = 0 <= a ? ++D : --D) {
        for (t[r](s), p = [], m = L = 0; L <= 5; m = ++L) {
          for (k = c.moves[m], i = 0; i <= 2; ++i)
            t[o](k), p.push(t[r]());
          t[o](k);
        }
        b.push(p);
      }
      return b;
    }, v = (function() {
      var e, r;
      return e = new c(), r = new c(), function(n, o) {
        var t, s;
        for (e.URtoUL(n), r.UBtoDF(o), t = s = 0; s <= 7; t = ++s)
          if (e.ep[t] !== -1) {
            if (r.ep[t] !== -1)
              return -1;
            r.ep[t] = e.ep[t];
          }
        return r.URtoDF();
      };
    })(), W = 2187, $ = 2048, fe = 2, Z = 11880, _ = 495, j = 24, G = 20160, X = 20160, te = 1320, ee = 1320, c.moveTables = {
      parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
      twist: null,
      flip: null,
      FRtoBR: null,
      URFtoDLF: null,
      URtoDF: null,
      URtoUL: null,
      UBtoDF: null,
      mergeURtoDF: null
    }, w = {
      // name: [scope, size]
      twist: ["corners", W],
      flip: ["edges", $],
      FRtoBR: ["edges", Z],
      URFtoDLF: ["corners", G],
      URtoDF: ["edges", X],
      URtoUL: ["edges", te],
      UBtoDF: ["edges", ee],
      mergeURtoDF: []
    }, c.computeMoveTables = function(...e) {
      var r, n, o, t, s, p;
      for (e.length === 0 && (e = (function() {
        var m;
        m = [];
        for (o in w)
          m.push(o);
        return m;
      })()), n = 0, r = e.length; n < r; n++)
        p = e[n], this.moveTables[p] === null && (p === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var m, D, k, L;
          for (L = [], D = k = 0; k <= 335; D = ++k)
            L.push((function() {
              var i, a;
              for (a = [], m = i = 0; i <= 335; m = ++i)
                a.push(v(D, m));
              return a;
            })());
          return L;
        })() : ([t, s] = w[p], this.moveTables[p] = q(t, p, s)));
      return this;
    }, ve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], R = (function() {
      var e, r, n, o, t, s, p, m;
      for (m = [], r = n = 0; n <= 5; r = ++n) {
        for (o = [], e = t = 0; t <= 5; e = ++t)
          if (e !== r && e !== r - 3)
            for (p = s = 0; s <= 2; p = ++s)
              o.push(e * 3 + p);
        m.push(o);
      }
      return m;
    })(), A = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], S = (function() {
      var e, r, n, o, t, s, p, m, D, k;
      for (k = [], r = o = 0; o <= 5; r = ++o) {
        for (t = [], e = s = 0; s <= 5; e = ++s)
          if (e !== r && e !== r - 3)
            for (D = e === 0 || e === 3 ? [0, 1, 2] : [1], p = 0, n = D.length; p < n; p++)
              m = D[p], t.push(e * 3 + m);
        k.push(t);
      }
      return k;
    })(), U = function(e, r, n) {
      var o, t, s;
      return o = r % 8, s = r >> 3, t = o << 2, n != null ? (e[s] &= ~(15 << t), e[s] |= n << t, n) : (e[s] & 15 << t) >>> t;
    }, J = function(e, r, n, o) {
      var t, s, p, m, D, k, L, i, a, b, g, T;
      for (T = (function() {
        var P, I, ne;
        for (ne = [], P = 0, I = Math.ceil(r / 8) - 1; 0 <= I ? P <= I : P >= I; 0 <= I ? ++P : --P)
          ne.push(4294967295);
        return ne;
      })(), e === 1 ? i = ve : i = A, s = 0, U(T, 0, s), p = 1; p !== r; ) {
        for (m = k = 0, g = r - 1; 0 <= g ? k <= g : k >= g; m = 0 <= g ? ++k : --k)
          if (U(T, m) === s)
            for (t = n(m), b = 0, D = i.length; b < D; b++)
              L = i[b], a = o(t, L), U(T, a) === 15 && (U(T, a, s + 1), p++);
        s++;
      }
      return T;
    }, c.pruningTables = {
      sliceTwist: null,
      sliceFlip: null,
      sliceURFtoDLFParity: null,
      sliceURtoDFParity: null
    }, y = {
      // name: [phase, size, currentCoords, nextIndex]
      sliceTwist: [
        1,
        _ * W,
        function(e) {
          return [
            e % _,
            e / _ | 0
          ];
        },
        function(e, r) {
          var n, o, t, s;
          return [
            t,
            s
          ] = e, n = c.moveTables.FRtoBR[t * 24][r] / 24 | 0, o = c.moveTables.twist[s][r], o * _ + n;
        }
      ],
      sliceFlip: [
        1,
        _ * $,
        function(e) {
          return [
            e % _,
            e / _ | 0
          ];
        },
        function(e, r) {
          var n, o, t, s;
          return [
            s,
            n
          ] = e, t = c.moveTables.FRtoBR[s * 24][r] / 24 | 0, o = c.moveTables.flip[n][r], o * _ + t;
        }
      ],
      sliceURFtoDLFParity: [
        2,
        j * G * fe,
        function(e) {
          return [
            e % 2,
            (e / 2 | 0) % j,
            (e / 2 | 0) / j | 0
          ];
        },
        function(e, r) {
          var n, o, t, s, p, m;
          return [
            p,
            m,
            n
          ] = e, o = c.moveTables.parity[p][r], t = c.moveTables.FRtoBR[m][r], s = c.moveTables.URFtoDLF[n][r], (s * j + t) * 2 + o;
        }
      ],
      sliceURtoDFParity: [
        2,
        j * X * fe,
        function(e) {
          return [
            e % 2,
            (e / 2 | 0) % j,
            (e / 2 | 0) / j | 0
          ];
        },
        function(e, r) {
          var n, o, t, s, p, m;
          return [
            p,
            m,
            n
          ] = e, o = c.moveTables.parity[p][r], t = c.moveTables.FRtoBR[m][r], s = c.moveTables.URtoDF[n][r], (s * j + t) * 2 + o;
        }
      ]
    }, c.computePruningTables = function(...e) {
      var r, n, o, t, s;
      for (e.length === 0 && (e = (function() {
        var p;
        p = [];
        for (o in y)
          p.push(o);
        return p;
      })()), n = 0, r = e.length; n < r; n++)
        s = e[n], this.pruningTables[s] === null && (t = y[s], this.pruningTables[s] = J(...t));
      return this;
    }, c.initSolver = function() {
      return c.computeMoveTables(), c.computePruningTables();
    }, c.prototype.solveUpright = function(e = 22) {
      var r, n, o, t, s, p, m, D, k;
      return o = (function() {
        var L, i, a, b, g, T, P;
        for (i = ["U", "R", "F", "D", "L", "B"], T = ["", "2", "'"], P = [], L = a = 0; a <= 5; L = ++a)
          for (g = b = 0; b <= 2; g = ++b)
            P.push(i[L] + T[g]);
        return P;
      })(), r = class {
        constructor(i) {
          this.parent = null, this.lastMove = null, this.depth = 0, i && this.init(i);
        }
        init(i) {
          return this.flip = i.flip(), this.twist = i.twist(), this.slice = i.FRtoBR() / j | 0, this.parity = i.cornerParity(), this.URFtoDLF = i.URFtoDLF(), this.FRtoBR = i.FRtoBR(), this.URtoUL = i.URtoUL(), this.UBtoDF = i.UBtoDF(), this;
        }
        solution() {
          return this.parent ? this.parent.solution() + o[this.lastMove] + " " : "";
        }
        //# Helpers
        move(i, a, b) {
          return c.moveTables[i][a][b];
        }
        pruning(i, a) {
          return U(c.pruningTables[i], a);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? R[this.lastMove / 3 | 0] : ve;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var i, a;
          return i = this.pruning("sliceFlip", _ * this.flip + this.slice), a = this.pruning("sliceTwist", _ * this.twist + this.slice), l(i, a);
        }
        // Compute the next phase 1 state for the given move
        next1(i) {
          var a;
          return a = n.pop(), a.parent = this, a.lastMove = i, a.depth = this.depth + 1, a.flip = this.move("flip", this.flip, i), a.twist = this.move("twist", this.twist, i), a.slice = this.move("FRtoBR", this.slice * 24, i) / 24 | 0, a;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? S[this.lastMove / 3 | 0] : A;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var i, a, b, g;
          return b = (j * this.URtoDF + this.FRtoBR) * fe + this.parity, i = this.pruning("sliceURtoDFParity", b), g = (j * this.URFtoDLF + this.FRtoBR) * fe + this.parity, a = this.pruning("sliceURFtoDLFParity", g), l(i, a);
        }
        // Initialize phase 2 coordinates
        init2(i = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), i))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(i) {
          var a;
          return a = n.pop(), a.parent = this, a.lastMove = i, a.depth = this.depth + 1, a.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, i), a.FRtoBR = this.move("FRtoBR", this.FRtoBR, i), a.parity = this.move("parity", this.parity, i), a.URtoDF = this.move("URtoDF", this.URtoDF, i), a;
        }
      }, D = null, s = function(L) {
        var i, a, b, g;
        for (i = 0, g = [], i = a = 1, b = e; (1 <= b ? a <= b : a >= b) && (t(L, i), D === null); i = 1 <= b ? ++a : --a)
          g.push(i++);
        return g;
      }, t = function(L, i) {
        var a, b, g, T, P, I, ne;
        if (i === 0) {
          if (L.minDist1() === 0 && (L.lastMove === null || (P = L.lastMove, V.call(A, P) < 0)))
            return m(L);
        } else if (i > 0 && L.minDist1() <= i) {
          for (I = L.moves1(), ne = [], b = 0, a = I.length; b < a && (g = I[b], T = L.next1(g), t(T, i - 1), n.push(T), D === null); b++)
            ne.push(void 0);
          return ne;
        }
      }, m = function(L) {
        var i, a, b, g;
        for (L.init2(), g = [], i = a = 1, b = e - L.depth; (1 <= b ? a <= b : a >= b) && (p(L, i), D === null); i = 1 <= b ? ++a : --a)
          g.push(i++);
        return g;
      }, p = function(L, i) {
        var a, b, g, T, P, I;
        if (i === 0) {
          if (L.minDist2() === 0)
            return D = L.solution();
        } else if (i > 0 && L.minDist2() <= i) {
          for (P = L.moves2(), I = [], b = 0, a = P.length; b < a && (g = P[b], T = L.next2(g), p(T, i - 1), n.push(T), D === null); b++)
            I.push(void 0);
          return I;
        }
      }, n = (function() {
        var L, i, a;
        for (a = [], L = 0, i = e + 1; 0 <= i ? L <= i : L >= i; 0 <= i ? ++L : --L)
          a.push(new r());
        return a;
      })(), k = n.pop().init(this), s(k), n.push(k), D.length > 0 && (D = D.substring(0, D.length - 1)), D;
    }, C = {
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
    }, c.prototype.solve = function(e = 22) {
      var r, n, o, t, s, p, m, D, k;
      for (r = this.clone(), D = r.upright(), r.move(D), p = new c().move(D).center, k = r.solveUpright(e), m = [], s = k.split(" "), o = 0, n = s.length; o < n; o++)
        t = s[o], m.push(B[p[C[t[0]]]]), t.length > 1 && (m[m.length - 1] += t[1]);
      return m.join(" ");
    }, c.scramble = function() {
      return c.inverse(c.random().solve());
    };
  }).call(_e)), _e;
}
var Ae, Xe;
function it() {
  return Xe || (Xe = 1, Ae = Ze(), ot()), Ae;
}
var st = it();
const we = /* @__PURE__ */ rt(st), Je = 4294967296;
function et() {
  const u = globalThis.crypto;
  if (!(u != null && u.getRandomValues))
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  const F = new Uint32Array(1);
  return u.getRandomValues(F), F[0];
}
function tt(u, F = et) {
  if (!Number.isSafeInteger(u) || u < 1 || u > Je)
    throw new RangeError("Invalid random integer range");
  const d = Math.floor(Je / u) * u;
  for (; ; ) {
    const c = F();
    if (!Number.isInteger(c) || c < 0 || c >= Je)
      throw new RangeError("Random source must return a uint32");
    if (c < d)
      return c % u;
  }
}
function ut(u, F = et) {
  const d = [...u];
  for (let c = d.length - 1; c > 0; c--) {
    const x = tt(c + 1, F);
    [d[c], d[x]] = [d[x], d[c]];
  }
  return d;
}
function Ye(u, F) {
  if (!Number.isSafeInteger(u) || u < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return ut(
    Array.from({ length: u }, (d, c) => c),
    F
  );
}
function lt() {
  return {
    center: Array.from({ length: 6 }, (u, F) => F),
    cp: Array.from({ length: 8 }, (u, F) => F),
    co: Array(8).fill(0),
    ep: Array.from({ length: 12 }, (u, F) => F),
    eo: Array(12).fill(0)
  };
}
function xe(u) {
  let F = 0;
  for (let d = 0; d < u.length; d++)
    for (let c = d + 1; c < u.length; c++)
      u[d] > u[c] && (F ^= 1);
  return F;
}
function He(u, F) {
  return !Array.isArray(u) || u.length !== F ? !1 : new Set(u).size === F && u.every(
    (c) => Number.isInteger(c) && c >= 0 && c < F
  );
}
function Ke(u, F, d) {
  return !Array.isArray(u) || u.length !== F || !u.every(
    (c) => Number.isInteger(c) && c >= 0 && c < d
  ) ? !1 : u.reduce((c, x) => c + x, 0) % d === 0;
}
function ft(u) {
  if (!u || typeof u != "object")
    return !1;
  const { cp: F, co: d, ep: c, eo: x } = u;
  return !He(F, 8) || !He(c, 12) || !Ke(d, 8, 3) || !Ke(x, 12, 2) ? !1 : xe(F) === xe(c);
}
function ct(u) {
  if (!ft(u))
    throw new Error("Invalid 3x3 cube state");
  return u;
}
function Qe(u, F, d) {
  const c = [];
  let x = 0;
  for (let oe = 0; oe < u - 1; oe++) {
    const O = tt(F, d);
    c.push(O), x += O;
  }
  return c.push((F - x % F) % F), c;
}
function at(u) {
  let F, d;
  do
    F = Ye(8, u), d = Ye(12, u);
  while (xe(F) !== xe(d));
  const c = {
    ...lt(),
    cp: F,
    ep: d,
    co: Qe(8, 3, u),
    eo: Qe(12, 2, u)
  };
  return ct(c);
}
let Ce;
async function ht() {
  Ce || (Ce = Promise.resolve().then(() => {
    we.initSolver();
  }));
  try {
    await Ce;
  } catch (u) {
    throw Ce = void 0, u;
  }
}
function ze(u) {
  return new we({
    center: u.center ?? [0, 1, 2, 3, 4, 5],
    cp: u.cp,
    co: u.co,
    ep: u.ep,
    eo: u.eo
  });
}
function pt(u) {
  const F = ze(u), d = F.solve();
  if (typeof d != "string" || !d.trim())
    throw new Error("Solver did not return a valid solution");
  if (!F.clone().move(d).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return d.trim();
}
function vt(u) {
  return we.inverse(u).trim();
}
const mt = ["U", "R", "F", "D", "L", "B"], Ft = ["", "2", "'"];
let qe;
function Rt() {
  if (!qe) {
    const u = /* @__PURE__ */ new Set();
    u.add(new we().asString());
    for (const F of mt)
      for (const d of Ft)
        u.add(
          new we().move(F + d).asString()
        );
    qe = u;
  }
  return qe;
}
function wt(u) {
  const F = ze(u);
  return !Rt().has(F.asString());
}
function gt(u) {
  for (; ; ) {
    const F = at(u);
    if (wt(F))
      return {
        stateData: F,
        cube: ze(F)
      };
  }
}
async function Ut(u) {
  await ht();
  const { stateData: F, cube: d } = gt(u), c = pt(F), x = vt(c);
  if (new we().move(x).asString() !== d.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!d.clone().move(c).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: x,
    moves: x.split(/\s+/),
    state: F
  };
}
const dt = Object.freeze(["333"]);
async function Lt(u = "333", F = {}) {
  if (u !== "333")
    throw new RangeError(
      `Unsupported event "${u}". Supported events: ${dt.join(", ")}`
    );
  if (F.randomWord !== void 0 && typeof F.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  return Ut(F.randomWord);
}
export {
  dt as events,
  Lt as generate
};
