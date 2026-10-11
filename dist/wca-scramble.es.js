function rt(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Pe = { exports: {} }, nt = Pe.exports, We;
function Ze() {
  return We || (We = 1, (function(u) {
    (function() {
      var R, w, a, x, $, O, ie, se, K, ue, Q, le, Z, me, W, ee, fe, _, j, G, te, X, Y, re, ne, ce, ae, Ue, Ee, Re, he, pe, ve;
      [j, _, me, $, fe, R] = [0, 1, 2, 3, 4, 5], [ae, Y, ne, te, K, Q, ie, Z] = [0, 1, 2, 3, 4, 5, 6, 7], [ce, X, re, G, le, se, ue, O, ee, W, w, a] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [Ee, he, ve] = (function() {
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
      })(), Ue = ["U", "R", "F", "D", "L", "B"], Re = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], pe = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], x = (function() {
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
            var h, f, l, v, U, F, S, N, d, b, M;
            for (M = [], l = v = 0; v <= 5; l = ++v)
              M[9 * l + 4] = Ue[this.center[l]];
            for (l = U = 0; U <= 7; l = ++U)
              for (h = this.cp[l], d = this.co[l], S = F = 0; F <= 2; S = ++F)
                M[he[l][(S + d) % 3]] = Re[h][S];
            for (l = N = 0; N <= 11; l = ++N)
              for (f = this.ep[l], d = this.eo[l], S = b = 0; b <= 1; S = ++b)
                M[ve[l][(S + d) % 2]] = pe[f][S];
            return M.join("");
          }
          static fromString(h) {
            var f, l, v, U, F, S, N, d, b, M, E, z, V, e;
            for (v = new B(), U = S = 0; S <= 5; U = ++S)
              for (F = N = 0; N <= 5; F = ++N)
                h[9 * U + 4] === Ue[F] && (v.center[U] = F);
            for (U = d = 0; d <= 7; U = ++d) {
              for (M = b = 0; b <= 2 && !((e = h[he[U][M]]) === "U" || e === "D"); M = ++b)
                ;
              for (f = h[he[U][(M + 1) % 3]], l = h[he[U][(M + 2) % 3]], F = E = 0; E <= 7; F = ++E)
                f === Re[F][1] && l === Re[F][2] && (v.cp[U] = F, v.co[U] = M % 3);
            }
            for (U = z = 0; z <= 11; U = ++z)
              for (F = V = 0; V <= 11; F = ++V) {
                if (h[ve[U][0]] === pe[F][0] && h[ve[U][1]] === pe[F][1]) {
                  v.ep[U] = F, v.eo[U] = 0;
                  break;
                }
                if (h[ve[U][0]] === pe[F][1] && h[ve[U][1]] === pe[F][0]) {
                  v.ep[U] = F, v.eo[U] = 1;
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
            var h, f, l, v, U, F, S;
            for (l = this.clone(), l.move(l.upright()), f = U = 0; U <= 5; f = ++U)
              if (l.center[f] !== f)
                return !1;
            for (h = F = 0; F <= 7; h = ++F)
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
            var f, l, v, U, F, S, N, d;
            for (N = J(h), l = 0, U = N.length; l < U; l++)
              for (F = N[l], f = F / 3 | 0, S = F % 3, v = 0, d = S; 0 <= d ? v <= d : v >= d; 0 <= d ? ++v : --v)
                this.multiply(B.moves[f]);
            return this;
          }
          upright() {
            var h, f, l, v, U, F;
            for (h = this.clone(), F = [], f = v = 0; v <= 5 && h.center[f] !== me; f = ++v)
              ;
            switch (f) {
              case $:
                F.push("x");
                break;
              case j:
                F.push("x'");
                break;
              case R:
                F.push("x2");
                break;
              case _:
                F.push("y");
                break;
              case fe:
                F.push("y'");
            }
            for (F.length && h.move(F[0]), l = U = 0; U <= 5 && h.center[l] !== j; l = ++U)
              ;
            switch (l) {
              case fe:
                F.push("z");
                break;
              case _:
                F.push("z'");
                break;
              case $:
                F.push("z2");
            }
            return F.join(" ");
          }
          static inverse(h) {
            var f, l, v, U, F, S, N;
            if (S = (function() {
              var d, b, M, E;
              for (M = J(h), E = [], d = 0, b = M.length; d < b; d++)
                U = M[d], f = U / 3 | 0, F = U % 3, E.push(f * 3 + -(F - 1) + 1);
              return E;
            })(), S.reverse(), typeof h == "string") {
              for (N = "", l = 0, v = S.length; l < v; l++)
                U = S[l], f = U / 3 | 0, F = U % 3, N += A[f], F === 1 ? N += "2" : F === 2 && (N += "'"), N += " ";
              return N.substring(0, N.length - 1);
            } else return h.length != null ? S : S[0];
          }
        }
        return B.prototype.randomize = (function() {
          var C, h, f, l, v, U, F, S, N;
          return U = function(d, b) {
            return d + Math.floor(Math.random() * (b - d + 1));
          }, N = function(d) {
            var b, M;
            for (b = d.length; b !== 0; )
              M = U(0, b - 1), b -= 1, d[b], [d[b], d[M]] = [d[M], d[b]];
          }, l = function(d) {
            var b, M, E, z, V, e, r;
            for (V = 0, r = (function() {
              var n, o, t;
              for (t = [], n = 0, o = d.length - 1; 0 <= o ? n <= o : n >= o; 0 <= o ? ++n : --n)
                t.push(!1);
              return t;
            })(); ; ) {
              for (b = -1, E = z = 0, e = d.length - 1; 0 <= e ? z <= e : z >= e; E = 0 <= e ? ++z : --z)
                if (!r[E]) {
                  b = E;
                  break;
                }
              if (b === -1)
                break;
              for (M = 0; !r[b]; )
                r[b] = !0, M++, b = d[b];
              V += M + 1;
            }
            return V;
          }, C = function(d, b) {
            var M;
            return M = l(b) + l(d), M % 2 === 0;
          }, f = function(d, b) {
            for (N(b), N(d); !C(d, b); )
              N(b), N(d);
          }, F = function(d, b) {
            var M, E, z, V;
            for (z = 0, M = E = 0, V = d.length - 1; 0 <= V ? E <= V : E >= V; M = 0 <= V ? ++E : --E)
              z += d[M] = U(0, b - 1);
          }, v = function(d, b) {
            return d.reduce(function(M, E) {
              return M + E;
            }) % b === 0;
          }, h = function(d, b) {
            for (F(d, 3); !v(d, 3); )
              F(d, 3);
            for (F(b, 2); !v(b, 2); )
              F(b, 2);
          }, S = function() {
            return f(this.cp, this.ep), h(this.co, this.eo), this;
          }, S;
        })(), B.moves = [
          {
            // U
            center: [0, 1, 2, 3, 4, 5],
            cp: [
              te,
              ae,
              Y,
              ne,
              K,
              Q,
              ie,
              Z
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
              G,
              ce,
              X,
              re,
              le,
              se,
              ue,
              O,
              ee,
              W,
              w,
              a
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
              K,
              Y,
              ne,
              ae,
              Z,
              Q,
              ie,
              te
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
              ee,
              X,
              re,
              G,
              a,
              se,
              ue,
              O,
              le,
              W,
              w,
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
              Y,
              Q,
              ne,
              te,
              ae,
              K,
              ie,
              Z
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
              W,
              re,
              G,
              le,
              ee,
              ue,
              O,
              X,
              se,
              w,
              a
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
              Y,
              ne,
              te,
              Q,
              ie,
              Z,
              K
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
              X,
              re,
              G,
              se,
              ue,
              O,
              le,
              ee,
              W,
              w,
              a
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
              ne,
              ie,
              te,
              K,
              Y,
              Q,
              Z
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
              X,
              w,
              G,
              le,
              se,
              W,
              O,
              ee,
              re,
              ue,
              a
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
              Y,
              te,
              Z,
              K,
              Q,
              ne,
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
              X,
              re,
              a,
              le,
              se,
              ue,
              w,
              ee,
              W,
              G,
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
              $,
              R,
              _
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              ie,
              Z
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
              X,
              re,
              G,
              le,
              se,
              ue,
              O,
              W,
              w,
              a,
              ee
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
              R,
              _,
              j,
              me,
              fe,
              $
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              ie,
              Z
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
              re,
              O,
              le,
              X,
              ue,
              se,
              ee,
              W,
              w,
              a
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
              $,
              R
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              ie,
              Z
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
              X,
              ue,
              G,
              ce,
              se,
              le,
              O,
              ee,
              W,
              w,
              a
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
          var h, f, l, v, U, F, S;
          if (typeof C == "string") {
            for (F = C.split(/\s+/), S = [], h = 0, f = F.length; h < f; h++)
              if (v = F[h], v.length !== 0) {
                if (v.length > 2)
                  throw new Error(`Invalid move: ${v}`);
                if (l = q[v[0]], l === void 0)
                  throw new Error(`Invalid move: ${v}`);
                if (v.length === 1)
                  U = 0;
                else if (v[1] === "2")
                  U = 1;
                else if (v[1] === "'")
                  U = 2;
                else
                  throw new Error(`Invalid move: ${v}`);
                S.push(l * 3 + U);
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
    var u, R, w, a, x, $, O, ie, se, K, ue, Q, le, Z, me, W, ee, fe, _, j, G, te, X, Y, re, ne, ce, ae, Ue, Ee, Re, he, pe, ve, A, q, J, B, C, h, f, l, v, U, F, S, N, d, b, M, E, z, V = [].indexOf;
    a = this.Cube || Ze(), [pe, Ue, Re, ce, ie, K, $, Q] = [0, 1, 2, 3, 4, 5, 6, 7], [he, ae, Ee, ne, ue, O, se, x, Z, le, u, R] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], w = function(e, r) {
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
        var L, i, c;
        for (c = [], t = L = 0, i = m; 0 <= i ? L <= i : L >= i; t = 0 <= i ? ++L : --L)
          c.push(0);
        return c;
      })(), function(L) {
        var i, c, y, g, T, P, I, oe, Fe, ge, de, De, je, Le, be, Ie, ye, Oe, Ve, Be, $e, Se, Me, Ne, H, ke, Te;
        if (L != null) {
          for (t = P = 0, de = m; 0 <= de ? P <= de : P >= de; t = 0 <= de ? ++P : --P)
            D[t] = t + r;
          for (c = L % p, i = L / p | 0, Fe = this[k], t = I = 0, De = s; 0 <= De ? I <= De : I >= De; t = 0 <= De ? ++I : --I)
            Fe[t] = -1;
          for (g = oe = 1, Le = m; 1 <= Le ? oe <= Le : oe >= Le; g = 1 <= Le ? ++oe : --oe)
            for (T = c % (g + 1), c = c / (g + 1) | 0; T > 0; )
              E(D, 0, g), T--;
          if (H = m, o)
            for (g = ge = 0, be = s; 0 <= be ? ge <= be : ge >= be; g = 0 <= be ? ++ge : --ge)
              y = w(s - g, H + 1), i - y >= 0 && (Fe[g] = D[m - H], i -= y, H--);
          else
            for (g = Se = Ie = s; Ie <= 0 ? Se <= 0 : Se >= 0; g = Ie <= 0 ? ++Se : --Se)
              y = w(g, H + 1), i - y >= 0 && (Fe[g] = D[H], i -= y, H--);
          return this;
        } else {
          for (Fe = this[k], t = Me = 0, ye = m; 0 <= ye ? Me <= ye : Me >= ye; t = 0 <= ye ? ++Me : --Me)
            D[t] = -1;
          if (i = c = H = 0, o)
            for (g = Ne = Oe = s; Oe <= 0 ? Ne <= 0 : Ne >= 0; g = Oe <= 0 ? ++Ne : --Ne)
              r <= (Ve = Fe[g]) && Ve <= n && (i += w(s - g, H + 1), D[m - H] = Fe[g], H++);
          else
            for (g = ke = 0, Be = s; 0 <= Be ? ke <= Be : ke >= Be; g = 0 <= Be ? ++ke : --ke)
              r <= ($e = Fe[g]) && $e <= n && (i += w(g, H + 1), D[H] = Fe[g], H++);
          for (g = Te = je = m; je <= 0 ? Te <= 0 : Te >= 0; g = je <= 0 ? ++Te : --Te) {
            for (T = 0; D[g] !== r + g; )
              M(D, 0, g), T++;
            c = (g + 1) * c + T;
          }
          return i * p + c;
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
        for (D = 0, e = n = t = Q, s = pe + 1; t <= s ? n <= s : n >= s; e = t <= s ? ++n : --n)
          for (r = o = p = e - 1, m = pe; p <= m ? o <= m : o >= m; r = p <= m ? ++o : --o)
            this.cp[r] > this.cp[e] && D++;
        return D % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var e, r, n, o, t, s, p, m, D;
        for (D = 0, e = n = t = R, s = he + 1; t <= s ? n <= s : n >= s; e = t <= s ? ++n : --n)
          for (r = o = p = e - 1, m = he; p <= m ? o <= m : o >= m; r = p <= m ? ++o : --o)
            this.ep[r] > this.ep[e] && D++;
        return D % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: N("corners", pe, K),
      // Permutation of the three edges UR, UF, UL
      URtoUL: N("edges", he, Ee),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: N("edges", ne, O),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: N("edges", he, O),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: N("edges", Z, R, !0)
    };
    for (f in me)
      z = me[f], a.prototype[f] = z;
    q = function(e, r, n) {
      var o, t, s, p, m, D, k, L, i, c, y;
      for (o = e === "corners" ? "cornerMultiply" : "edgeMultiply", t = new a(), y = [], s = D = 0, c = n - 1; 0 <= c ? D <= c : D >= c; s = 0 <= c ? ++D : --D) {
        for (t[r](s), p = [], m = L = 0; L <= 5; m = ++L) {
          for (k = a.moves[m], i = 0; i <= 2; ++i)
            t[o](k), p.push(t[r]());
          t[o](k);
        }
        y.push(p);
      }
      return y;
    }, v = (function() {
      var e, r;
      return e = new a(), r = new a(), function(n, o) {
        var t, s;
        for (e.URtoUL(n), r.UBtoDF(o), t = s = 0; s <= 7; t = ++s)
          if (e.ep[t] !== -1) {
            if (r.ep[t] !== -1)
              return -1;
            r.ep[t] = e.ep[t];
          }
        return r.URtoDF();
      };
    })(), G = 2187, W = 2048, fe = 2, ee = 11880, _ = 495, j = 24, X = 20160, Y = 20160, re = 1320, te = 1320, a.moveTables = {
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
      twist: ["corners", G],
      flip: ["edges", W],
      FRtoBR: ["edges", ee],
      URFtoDLF: ["corners", X],
      URtoDF: ["edges", Y],
      URtoUL: ["edges", re],
      UBtoDF: ["edges", te],
      mergeURtoDF: []
    }, a.computeMoveTables = function(...e) {
      var r, n, o, t, s, p;
      for (e.length === 0 && (e = (function() {
        var m;
        m = [];
        for (o in U)
          m.push(o);
        return m;
      })()), n = 0, r = e.length; n < r; n++)
        p = e[n], this.moveTables[p] === null && (p === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var m, D, k, L;
          for (L = [], D = k = 0; k <= 335; D = ++k)
            L.push((function() {
              var i, c;
              for (c = [], m = i = 0; i <= 335; m = ++i)
                c.push(v(D, m));
              return c;
            })());
          return L;
        })() : ([t, s] = U[p], this.moveTables[p] = q(t, p, s)));
      return this;
    }, ve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], F = (function() {
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
    })(), d = function(e, r, n) {
      var o, t, s;
      return o = r % 8, s = r >> 3, t = o << 2, n != null ? (e[s] &= ~(15 << t), e[s] |= n << t, n) : (e[s] & 15 << t) >>> t;
    }, J = function(e, r, n, o) {
      var t, s, p, m, D, k, L, i, c, y, g, T;
      for (T = (function() {
        var P, I, oe;
        for (oe = [], P = 0, I = Math.ceil(r / 8) - 1; 0 <= I ? P <= I : P >= I; 0 <= I ? ++P : --P)
          oe.push(4294967295);
        return oe;
      })(), e === 1 ? i = ve : i = A, s = 0, d(T, 0, s), p = 1; p !== r; ) {
        for (m = k = 0, g = r - 1; 0 <= g ? k <= g : k >= g; m = 0 <= g ? ++k : --k)
          if (d(T, m) === s)
            for (t = n(m), y = 0, D = i.length; y < D; y++)
              L = i[y], c = o(t, L), d(T, c) === 15 && (d(T, c, s + 1), p++);
        s++;
      }
      return T;
    }, a.pruningTables = {
      sliceTwist: null,
      sliceFlip: null,
      sliceURFtoDLFParity: null,
      sliceURtoDFParity: null
    }, b = {
      // name: [phase, size, currentCoords, nextIndex]
      sliceTwist: [
        1,
        _ * G,
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
          ] = e, n = a.moveTables.FRtoBR[t * 24][r] / 24 | 0, o = a.moveTables.twist[s][r], o * _ + n;
        }
      ],
      sliceFlip: [
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
            s,
            n
          ] = e, t = a.moveTables.FRtoBR[s * 24][r] / 24 | 0, o = a.moveTables.flip[n][r], o * _ + t;
        }
      ],
      sliceURFtoDLFParity: [
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
          ] = e, o = a.moveTables.parity[p][r], t = a.moveTables.FRtoBR[m][r], s = a.moveTables.URFtoDLF[n][r], (s * j + t) * 2 + o;
        }
      ],
      sliceURtoDFParity: [
        2,
        j * Y * fe,
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
          ] = e, o = a.moveTables.parity[p][r], t = a.moveTables.FRtoBR[m][r], s = a.moveTables.URtoDF[n][r], (s * j + t) * 2 + o;
        }
      ]
    }, a.computePruningTables = function(...e) {
      var r, n, o, t, s;
      for (e.length === 0 && (e = (function() {
        var p;
        p = [];
        for (o in b)
          p.push(o);
        return p;
      })()), n = 0, r = e.length; n < r; n++)
        s = e[n], this.pruningTables[s] === null && (t = b[s], this.pruningTables[s] = J(...t));
      return this;
    }, a.initSolver = function() {
      return a.computeMoveTables(), a.computePruningTables();
    }, a.prototype.solveUpright = function(e = 22) {
      var r, n, o, t, s, p, m, D, k;
      return o = (function() {
        var L, i, c, y, g, T, P;
        for (i = ["U", "R", "F", "D", "L", "B"], T = ["", "2", "'"], P = [], L = c = 0; c <= 5; L = ++c)
          for (g = y = 0; y <= 2; g = ++y)
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
        move(i, c, y) {
          return a.moveTables[i][c][y];
        }
        pruning(i, c) {
          return d(a.pruningTables[i], c);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? F[this.lastMove / 3 | 0] : ve;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var i, c;
          return i = this.pruning("sliceFlip", _ * this.flip + this.slice), c = this.pruning("sliceTwist", _ * this.twist + this.slice), l(i, c);
        }
        // Compute the next phase 1 state for the given move
        next1(i) {
          var c;
          return c = n.pop(), c.parent = this, c.lastMove = i, c.depth = this.depth + 1, c.flip = this.move("flip", this.flip, i), c.twist = this.move("twist", this.twist, i), c.slice = this.move("FRtoBR", this.slice * 24, i) / 24 | 0, c;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? S[this.lastMove / 3 | 0] : A;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var i, c, y, g;
          return y = (j * this.URtoDF + this.FRtoBR) * fe + this.parity, i = this.pruning("sliceURtoDFParity", y), g = (j * this.URFtoDLF + this.FRtoBR) * fe + this.parity, c = this.pruning("sliceURFtoDLFParity", g), l(i, c);
        }
        // Initialize phase 2 coordinates
        init2(i = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), i))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(i) {
          var c;
          return c = n.pop(), c.parent = this, c.lastMove = i, c.depth = this.depth + 1, c.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, i), c.FRtoBR = this.move("FRtoBR", this.FRtoBR, i), c.parity = this.move("parity", this.parity, i), c.URtoDF = this.move("URtoDF", this.URtoDF, i), c;
        }
      }, D = null, s = function(L) {
        var i, c, y, g;
        for (i = 0, g = [], i = c = 1, y = e; (1 <= y ? c <= y : c >= y) && (t(L, i), D === null); i = 1 <= y ? ++c : --c)
          g.push(i++);
        return g;
      }, t = function(L, i) {
        var c, y, g, T, P, I, oe;
        if (i === 0) {
          if (L.minDist1() === 0 && (L.lastMove === null || (P = L.lastMove, V.call(A, P) < 0)))
            return m(L);
        } else if (i > 0 && L.minDist1() <= i) {
          for (I = L.moves1(), oe = [], y = 0, c = I.length; y < c && (g = I[y], T = L.next1(g), t(T, i - 1), n.push(T), D === null); y++)
            oe.push(void 0);
          return oe;
        }
      }, m = function(L) {
        var i, c, y, g;
        for (L.init2(), g = [], i = c = 1, y = e - L.depth; (1 <= y ? c <= y : c >= y) && (p(L, i), D === null); i = 1 <= y ? ++c : --c)
          g.push(i++);
        return g;
      }, p = function(L, i) {
        var c, y, g, T, P, I;
        if (i === 0) {
          if (L.minDist2() === 0)
            return D = L.solution();
        } else if (i > 0 && L.minDist2() <= i) {
          for (P = L.moves2(), I = [], y = 0, c = P.length; y < c && (g = P[y], T = L.next2(g), p(T, i - 1), n.push(T), D === null); y++)
            I.push(void 0);
          return I;
        }
      }, n = (function() {
        var L, i, c;
        for (c = [], L = 0, i = e + 1; 0 <= i ? L <= i : L >= i; 0 <= i ? ++L : --L)
          c.push(new r());
        return c;
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
    }, a.prototype.solve = function(e = 22) {
      var r, n, o, t, s, p, m, D, k;
      for (r = this.clone(), D = r.upright(), r.move(D), p = new a().move(D).center, k = r.solveUpright(e), m = [], s = k.split(" "), o = 0, n = s.length; o < n; o++)
        t = s[o], m.push(B[p[C[t[0]]]]), t.length > 1 && (m[m.length - 1] += t[1]);
      return m.join(" ");
    }, a.scramble = function() {
      return a.inverse(a.random().solve());
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
  const R = new Uint32Array(1);
  return u.getRandomValues(R), R[0];
}
function tt(u, R = et) {
  if (!Number.isSafeInteger(u) || u < 1 || u > Je)
    throw new RangeError("Invalid random integer range");
  const w = Math.floor(Je / u) * u;
  for (; ; ) {
    const a = R();
    if (!Number.isInteger(a) || a < 0 || a >= Je)
      throw new RangeError("Random source must return a uint32");
    if (a < w)
      return a % u;
  }
}
function ut(u, R = et) {
  const w = [...u];
  for (let a = w.length - 1; a > 0; a--) {
    const x = tt(a + 1, R);
    [w[a], w[x]] = [w[x], w[a]];
  }
  return w;
}
function Ye(u, R) {
  if (!Number.isSafeInteger(u) || u < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return ut(
    Array.from({ length: u }, (w, a) => a),
    R
  );
}
function xe(u) {
  let R = 0;
  for (let w = 0; w < u.length; w++)
    for (let a = w + 1; a < u.length; a++)
      u[w] > u[a] && (R ^= 1);
  return R;
}
function He(u, R) {
  return !Array.isArray(u) || u.length !== R ? !1 : new Set(u).size === R && u.every(
    (a) => Number.isInteger(a) && a >= 0 && a < R
  );
}
function lt(u) {
  return Array.isArray(u) && u.length === 6 && u.every((R, w) => R === w);
}
function Ke(u, R, w) {
  return !Array.isArray(u) || u.length !== R || !u.every(
    (a) => Number.isInteger(a) && a >= 0 && a < w
  ) ? !1 : u.reduce((a, x) => a + x, 0) % w === 0;
}
function ft(u) {
  if (!u || typeof u != "object")
    return !1;
  const { center: R, cp: w, co: a, ep: x, eo: $ } = u;
  return R !== void 0 && !lt(R) || !He(w, 8) || !He(x, 12) || !Ke(a, 8, 3) || !Ke($, 12, 2) ? !1 : xe(w) === xe(x);
}
function ct(u) {
  if (!ft(u))
    throw new Error("Invalid 3x3 cube state");
  return u;
}
function Qe(u, R, w) {
  const a = [];
  let x = 0;
  for (let $ = 0; $ < u - 1; $++) {
    const O = tt(R, w);
    a.push(O), x += O;
  }
  return a.push((R - x % R) % R), a;
}
function at(u) {
  let R, w;
  do
    R = Ye(8, u), w = Ye(12, u);
  while (xe(R) !== xe(w));
  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: R,
    co: Qe(8, 3, u),
    ep: w,
    eo: Qe(12, 2, u)
  };
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
  return ct(u), new we({
    center: u.center ?? [0, 1, 2, 3, 4, 5],
    cp: u.cp,
    co: u.co,
    ep: u.ep,
    eo: u.eo
  });
}
function pt(u) {
  const R = ze(u), w = R.solve();
  if (typeof w != "string" || !w.trim())
    throw new Error("Solver did not return a valid solution");
  if (!R.clone().move(w).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return w.trim();
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
    for (const R of mt)
      for (const w of Ft)
        u.add(
          new we().move(R + w).asString()
        );
    qe = u;
  }
  return qe;
}
function wt(u) {
  const R = ze(u);
  return !Rt().has(R.asString());
}
function Ut(u) {
  for (; ; ) {
    const R = at(u);
    if (wt(R))
      return {
        stateData: R,
        cube: ze(R)
      };
  }
}
async function gt(u) {
  await ht();
  const { stateData: R, cube: w } = Ut(u), a = pt(R), x = vt(a);
  if (new we().move(x).asString() !== w.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!w.clone().move(a).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: x,
    moves: x.split(/\s+/),
    state: R
  };
}
const dt = Object.freeze(["333"]);
async function Lt(u = "333", R = {}) {
  if (u !== "333")
    throw new RangeError(
      `Unsupported event "${u}". Supported events: ${dt.join(", ")}`
    );
  if (R.randomWord !== void 0 && typeof R.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  return gt(R.randomWord);
}
export {
  dt as events,
  Lt as generate
};
