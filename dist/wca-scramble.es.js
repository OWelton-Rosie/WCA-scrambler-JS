function it(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var je = { exports: {} }, ot = je.exports, We;
function et() {
  return We || (We = 1, (function(n) {
    (function() {
      var v, R, a, P, V, O, oe, se, K, ue, Q, fe, Z, me, G, ee, le, _, x, W, te, X, Y, re, ne, ce, ae, ge, ke, Re, he, pe, ve;
      [x, _, me, V, le, v] = [0, 1, 2, 3, 4, 5], [ae, Y, ne, te, K, Q, oe, Z] = [0, 1, 2, 3, 4, 5, 6, 7], [ce, X, re, W, fe, se, ue, O, ee, G, R, a] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [ke, he, ve] = (function() {
        var A, z, J, B, C, h;
        return h = function(l) {
          return l - 1;
        }, C = function(l) {
          return h(9) + l;
        }, J = function(l) {
          return C(9) + l;
        }, z = function(l) {
          return J(9) + l;
        }, B = function(l) {
          return z(9) + l;
        }, A = function(l) {
          return B(9) + l;
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
              z(3),
              J(9),
              C(7)
            ],
            [
              z(1),
              B(9),
              J(7)
            ],
            [
              z(7),
              A(9),
              B(7)
            ],
            [
              z(9),
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
              z(6),
              C(8)
            ],
            [
              z(2),
              J(8)
            ],
            [
              z(4),
              B(8)
            ],
            [
              z(8),
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
      })(), ge = ["U", "R", "F", "D", "L", "B"], Re = [["U", "R", "F"], ["U", "F", "L"], ["U", "L", "B"], ["U", "B", "R"], ["D", "F", "R"], ["D", "L", "F"], ["D", "B", "L"], ["D", "R", "B"]], pe = [["U", "R"], ["U", "F"], ["U", "L"], ["U", "B"], ["D", "R"], ["D", "F"], ["D", "L"], ["D", "B"], ["F", "R"], ["F", "L"], ["B", "L"], ["B", "R"]], P = (function() {
        var A, z, J;
        class B {
          constructor(h) {
            h != null ? this.init(h) : this.identity(), this.newCenter = (function() {
              var l, f;
              for (f = [], l = 0; l <= 5; ++l)
                f.push(0);
              return f;
            })(), this.newCp = (function() {
              var l, f;
              for (f = [], l = 0; l <= 7; ++l)
                f.push(0);
              return f;
            })(), this.newEp = (function() {
              var l, f;
              for (f = [], l = 0; l <= 11; ++l)
                f.push(0);
              return f;
            })(), this.newCo = (function() {
              var l, f;
              for (f = [], l = 0; l <= 7; ++l)
                f.push(0);
              return f;
            })(), this.newEo = (function() {
              var l, f;
              for (f = [], l = 0; l <= 11; ++l)
                f.push(0);
              return f;
            })();
          }
          init(h) {
            return this.center = h.center.slice(0), this.co = h.co.slice(0), this.ep = h.ep.slice(0), this.cp = h.cp.slice(0), this.eo = h.eo.slice(0);
          }
          identity() {
            return this.center = [0, 1, 2, 3, 4, 5], this.cp = [0, 1, 2, 3, 4, 5, 6, 7], this.co = (function() {
              var h, l;
              for (l = [], h = 0; h <= 7; ++h)
                l.push(0);
              return l;
            })(), this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.eo = (function() {
              var h, l;
              for (l = [], h = 0; h <= 11; ++h)
                l.push(0);
              return l;
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
            var h, l, f, m, g, w, S, M, d, b, E;
            for (E = [], f = m = 0; m <= 5; f = ++m)
              E[9 * f + 4] = ge[this.center[f]];
            for (f = g = 0; g <= 7; f = ++g)
              for (h = this.cp[f], d = this.co[f], S = w = 0; w <= 2; S = ++w)
                E[he[f][(S + d) % 3]] = Re[h][S];
            for (f = M = 0; M <= 11; f = ++M)
              for (l = this.ep[f], d = this.eo[f], S = b = 0; b <= 1; S = ++b)
                E[ve[f][(S + d) % 2]] = pe[l][S];
            return E.join("");
          }
          static fromString(h) {
            var l, f, m, g, w, S, M, d, b, E, k, q, $, e;
            for (m = new B(), g = S = 0; S <= 5; g = ++S)
              for (w = M = 0; M <= 5; w = ++M)
                h[9 * g + 4] === ge[w] && (m.center[g] = w);
            for (g = d = 0; d <= 7; g = ++d) {
              for (E = b = 0; b <= 2 && !((e = h[he[g][E]]) === "U" || e === "D"); E = ++b)
                ;
              for (l = h[he[g][(E + 1) % 3]], f = h[he[g][(E + 2) % 3]], w = k = 0; k <= 7; w = ++k)
                l === Re[w][1] && f === Re[w][2] && (m.cp[g] = w, m.co[g] = E % 3);
            }
            for (g = q = 0; q <= 11; g = ++q)
              for (w = $ = 0; $ <= 11; w = ++$) {
                if (h[ve[g][0]] === pe[w][0] && h[ve[g][1]] === pe[w][1]) {
                  m.ep[g] = w, m.eo[g] = 0;
                  break;
                }
                if (h[ve[g][0]] === pe[w][1] && h[ve[g][1]] === pe[w][0]) {
                  m.ep[g] = w, m.eo[g] = 1;
                  break;
                }
              }
            return m;
          }
          clone() {
            return new B(this.toJSON());
          }
          // A class method returning a new random cube
          static random() {
            return new B().randomize();
          }
          isSolved() {
            var h, l, f, m, g, w, S;
            for (f = this.clone(), f.move(f.upright()), l = g = 0; g <= 5; l = ++g)
              if (f.center[l] !== l)
                return !1;
            for (h = w = 0; w <= 7; h = ++w)
              if (f.cp[h] !== h || f.co[h] !== 0)
                return !1;
            for (m = S = 0; S <= 11; m = ++S)
              if (f.ep[m] !== m || f.eo[m] !== 0)
                return !1;
            return !0;
          }
          // Multiply this Cube with another Cube, restricted to centers.
          centerMultiply(h) {
            var l, f, m;
            for (m = f = 0; f <= 5; m = ++f)
              l = h.center[m], this.newCenter[m] = this.center[l];
            return [this.center, this.newCenter] = [this.newCenter, this.center], this;
          }
          // Multiply this Cube with another Cube, restricted to corners.
          cornerMultiply(h) {
            var l, f, m;
            for (m = f = 0; f <= 7; m = ++f)
              l = h.cp[m], this.newCp[m] = this.cp[l], this.newCo[m] = (this.co[l] + h.co[m]) % 3;
            return [this.cp, this.newCp] = [this.newCp, this.cp], [this.co, this.newCo] = [this.newCo, this.co], this;
          }
          // Multiply this Cube with another Cube, restricted to edges
          edgeMultiply(h) {
            var l, f, m;
            for (m = f = 0; f <= 11; m = ++f)
              l = h.ep[m], this.newEp[m] = this.ep[l], this.newEo[m] = (this.eo[l] + h.eo[m]) % 2;
            return [this.ep, this.newEp] = [this.newEp, this.ep], [this.eo, this.newEo] = [this.newEo, this.eo], this;
          }
          // Multiply this cube with another Cube
          multiply(h) {
            return this.centerMultiply(h), this.cornerMultiply(h), this.edgeMultiply(h), this;
          }
          move(h) {
            var l, f, m, g, w, S, M, d;
            for (M = J(h), f = 0, g = M.length; f < g; f++)
              for (w = M[f], l = w / 3 | 0, S = w % 3, m = 0, d = S; 0 <= d ? m <= d : m >= d; 0 <= d ? ++m : --m)
                this.multiply(B.moves[l]);
            return this;
          }
          upright() {
            var h, l, f, m, g, w;
            for (h = this.clone(), w = [], l = m = 0; m <= 5 && h.center[l] !== me; l = ++m)
              ;
            switch (l) {
              case V:
                w.push("x");
                break;
              case x:
                w.push("x'");
                break;
              case v:
                w.push("x2");
                break;
              case _:
                w.push("y");
                break;
              case le:
                w.push("y'");
            }
            for (w.length && h.move(w[0]), f = g = 0; g <= 5 && h.center[f] !== x; f = ++g)
              ;
            switch (f) {
              case le:
                w.push("z");
                break;
              case _:
                w.push("z'");
                break;
              case V:
                w.push("z2");
            }
            return w.join(" ");
          }
          static inverse(h) {
            var l, f, m, g, w, S, M;
            if (S = (function() {
              var d, b, E, k;
              for (E = J(h), k = [], d = 0, b = E.length; d < b; d++)
                g = E[d], l = g / 3 | 0, w = g % 3, k.push(l * 3 + -(w - 1) + 1);
              return k;
            })(), S.reverse(), typeof h == "string") {
              for (M = "", f = 0, m = S.length; f < m; f++)
                g = S[f], l = g / 3 | 0, w = g % 3, M += A[l], w === 1 ? M += "2" : w === 2 && (M += "'"), M += " ";
              return M.substring(0, M.length - 1);
            } else return h.length != null ? S : S[0];
          }
        }
        return B.prototype.randomize = (function() {
          var C, h, l, f, m, g, w, S, M;
          return g = function(d, b) {
            return d + Math.floor(Math.random() * (b - d + 1));
          }, M = function(d) {
            var b, E;
            for (b = d.length; b !== 0; )
              E = g(0, b - 1), b -= 1, d[b], [d[b], d[E]] = [d[E], d[b]];
          }, f = function(d) {
            var b, E, k, q, $, e, r;
            for ($ = 0, r = (function() {
              var i, o, t;
              for (t = [], i = 0, o = d.length - 1; 0 <= o ? i <= o : i >= o; 0 <= o ? ++i : --i)
                t.push(!1);
              return t;
            })(); ; ) {
              for (b = -1, k = q = 0, e = d.length - 1; 0 <= e ? q <= e : q >= e; k = 0 <= e ? ++q : --q)
                if (!r[k]) {
                  b = k;
                  break;
                }
              if (b === -1)
                break;
              for (E = 0; !r[b]; )
                r[b] = !0, E++, b = d[b];
              $ += E + 1;
            }
            return $;
          }, C = function(d, b) {
            var E;
            return E = f(b) + f(d), E % 2 === 0;
          }, l = function(d, b) {
            for (M(b), M(d); !C(d, b); )
              M(b), M(d);
          }, w = function(d, b) {
            var E, k, q, $;
            for (q = 0, E = k = 0, $ = d.length - 1; 0 <= $ ? k <= $ : k >= $; E = 0 <= $ ? ++k : --k)
              q += d[E] = g(0, b - 1);
          }, m = function(d, b) {
            return d.reduce(function(E, k) {
              return E + k;
            }) % b === 0;
          }, h = function(d, b) {
            for (w(d, 3); !m(d, 3); )
              w(d, 3);
            for (w(b, 2); !m(b, 2); )
              w(b, 2);
          }, S = function() {
            return l(this.cp, this.ep), h(this.co, this.eo), this;
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
              oe,
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
              W,
              ce,
              X,
              re,
              fe,
              se,
              ue,
              O,
              ee,
              G,
              R,
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
              oe,
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
              W,
              a,
              se,
              ue,
              O,
              fe,
              G,
              R,
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
              oe,
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
              G,
              re,
              W,
              fe,
              ee,
              ue,
              O,
              X,
              se,
              R,
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
              oe,
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
              W,
              se,
              ue,
              O,
              fe,
              ee,
              G,
              R,
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
              oe,
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
              R,
              W,
              fe,
              se,
              G,
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
              oe
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
              fe,
              se,
              ue,
              R,
              ee,
              G,
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
              x,
              me,
              le,
              V,
              v,
              _
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              oe,
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
              W,
              fe,
              se,
              ue,
              O,
              G,
              R,
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
              v,
              _,
              x,
              me,
              le,
              V
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              oe,
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
              W,
              re,
              O,
              fe,
              X,
              ue,
              se,
              ee,
              G,
              R,
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
              le,
              x,
              me,
              _,
              V,
              v
            ],
            cp: [
              ae,
              Y,
              ne,
              te,
              K,
              Q,
              oe,
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
              W,
              ce,
              se,
              fe,
              O,
              ee,
              G,
              R,
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
        ], z = {
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
          var h, l, f, m, g, w, S;
          if (typeof C == "string") {
            for (w = C.split(/\s+/), S = [], h = 0, l = w.length; h < l; h++)
              if (m = w[h], m.length !== 0) {
                if (m.length > 2)
                  throw new Error(`Invalid move: ${m}`);
                if (f = z[m[0]], f === void 0)
                  throw new Error(`Invalid move: ${m}`);
                if (m.length === 1)
                  g = 0;
                else if (m[1] === "2")
                  g = 1;
                else if (m[1] === "'")
                  g = 2;
                else
                  throw new Error(`Invalid move: ${m}`);
                S.push(f * 3 + g);
              }
            return S;
          } else return C.length != null ? C : [C];
        }, B.moves.push(new B().move("R M' L'").toJSON()), B.moves.push(new B().move("U E' D'").toJSON()), B.moves.push(new B().move("F S B'").toJSON()), B.moves.push(new B().move("U E'").toJSON()), B.moves.push(new B().move("R M'").toJSON()), B.moves.push(new B().move("F S").toJSON()), B.moves.push(new B().move("D E").toJSON()), B.moves.push(new B().move("L M").toJSON()), B.moves.push(new B().move("B S'").toJSON()), B;
      }).call(this), n !== null ? n.exports = P : this.Cube = P;
    }).call(ot);
  })(je)), je.exports;
}
var _e = {}, Xe;
function st() {
  return Xe || (Xe = 1, (function() {
    var n, v, R, a, P, V, O, oe, se, K, ue, Q, fe, Z, me, G, ee, le, _, x, W, te, X, Y, re, ne, ce, ae, ge, ke, Re, he, pe, ve, A, z, J, B, C, h, l, f, m, g, w, S, M, d, b, E, k, q, $ = [].indexOf;
    a = this.Cube || et(), [pe, ge, Re, ce, oe, K, V, Q] = [0, 1, 2, 3, 4, 5, 6, 7], [he, ae, ke, ne, ue, O, se, P, Z, fe, n, v] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], R = function(e, r) {
      var i, o, t;
      if (e < r)
        return 0;
      for (r > e / 2 && (r = e - r), t = 1, i = e, o = 1; i !== e - r; )
        t *= i, t /= o, i--, o++;
      return t;
    }, h = function(e) {
      var r, i, o, t;
      for (r = 1, i = o = 2, t = e; 2 <= t ? o <= t : o >= t; i = 2 <= t ? ++o : --o)
        r *= i;
      return r;
    }, f = function(e, r) {
      return e > r ? e : r;
    }, E = function(e, r, i) {
      var o, t, u, p, F;
      for (F = e[r], o = t = u = r, p = i - 1; u <= p ? t <= p : t >= p; o = u <= p ? ++t : --t)
        e[o] = e[o + 1];
      return e[i] = F;
    }, k = function(e, r, i) {
      var o, t, u, p, F;
      for (F = e[i], o = t = u = i, p = r + 1; u <= p ? t <= p : t >= p; o = u <= p ? ++t : --t)
        e[o] = e[o - 1];
      return e[r] = F;
    }, M = function(e, r, i, o = !1) {
      var t, u, p, F, D, N;
      return F = i - r, p = h(F + 1), e === "corners" ? (u = 7, N = "cp") : (u = 11, N = "ep"), D = (function() {
        var y, s, c;
        for (c = [], t = y = 0, s = F; 0 <= s ? y <= s : y >= s; t = 0 <= s ? ++y : --y)
          c.push(0);
        return c;
      })(), function(y) {
        var s, c, L, U, T, j, I, ie, Fe, Ue, de, De, xe, ye, be, Ie, Le, Oe, Ve, Be, Ge, Se, Ee, Me, H, Ne, Te;
        if (y != null) {
          for (t = j = 0, de = F; 0 <= de ? j <= de : j >= de; t = 0 <= de ? ++j : --j)
            D[t] = t + r;
          for (c = y % p, s = y / p | 0, Fe = this[N], t = I = 0, De = u; 0 <= De ? I <= De : I >= De; t = 0 <= De ? ++I : --I)
            Fe[t] = -1;
          for (U = ie = 1, ye = F; 1 <= ye ? ie <= ye : ie >= ye; U = 1 <= ye ? ++ie : --ie)
            for (T = c % (U + 1), c = c / (U + 1) | 0; T > 0; )
              k(D, 0, U), T--;
          if (H = F, o)
            for (U = Ue = 0, be = u; 0 <= be ? Ue <= be : Ue >= be; U = 0 <= be ? ++Ue : --Ue)
              L = R(u - U, H + 1), s - L >= 0 && (Fe[U] = D[F - H], s -= L, H--);
          else
            for (U = Se = Ie = u; Ie <= 0 ? Se <= 0 : Se >= 0; U = Ie <= 0 ? ++Se : --Se)
              L = R(U, H + 1), s - L >= 0 && (Fe[U] = D[H], s -= L, H--);
          return this;
        } else {
          for (Fe = this[N], t = Ee = 0, Le = F; 0 <= Le ? Ee <= Le : Ee >= Le; t = 0 <= Le ? ++Ee : --Ee)
            D[t] = -1;
          if (s = c = H = 0, o)
            for (U = Me = Oe = u; Oe <= 0 ? Me <= 0 : Me >= 0; U = Oe <= 0 ? ++Me : --Me)
              r <= (Ve = Fe[U]) && Ve <= i && (s += R(u - U, H + 1), D[F - H] = Fe[U], H++);
          else
            for (U = Ne = 0, Be = u; 0 <= Be ? Ne <= Be : Ne >= Be; U = 0 <= Be ? ++Ne : --Ne)
              r <= (Ge = Fe[U]) && Ge <= i && (s += R(U, H + 1), D[H] = Fe[U], H++);
          for (U = Te = xe = F; xe <= 0 ? Te <= 0 : Te >= 0; U = xe <= 0 ? ++Te : --Te) {
            for (T = 0; D[U] !== r + U; )
              E(D, 0, U), T++;
            c = (U + 1) * c + T;
          }
          return s * p + c;
        }
      };
    }, me = {
      // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
      // the DRB corner is fully determined by the orientation of the other
      // corners.
      twist: function(e) {
        var r, i, o, t, u, p;
        if (e != null) {
          for (u = 0, r = i = 6; i >= 0; r = --i)
            t = e % 3, e = e / 3 | 0, this.co[r] = t, u += t;
          return this.co[7] = (3 - u % 3) % 3, this;
        } else {
          for (p = 0, r = o = 0; o <= 6; r = ++o)
            p = 3 * p + this.co[r];
          return p;
        }
      },
      // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
      // BR edge is fully determined by the orientation of the other edges.
      flip: function(e) {
        var r, i, o, t, u, p;
        if (e != null) {
          for (u = 0, r = i = 10; i >= 0; r = --i)
            t = e % 2, e = e / 2 | 0, this.eo[r] = t, u += t;
          return this.eo[11] = (2 - u % 2) % 2, this;
        } else {
          for (p = 0, r = o = 0; o <= 10; r = ++o)
            p = 2 * p + this.eo[r];
          return p;
        }
      },
      // Parity of the corner permutation
      cornerParity: function() {
        var e, r, i, o, t, u, p, F, D;
        for (D = 0, e = i = t = Q, u = pe + 1; t <= u ? i <= u : i >= u; e = t <= u ? ++i : --i)
          for (r = o = p = e - 1, F = pe; p <= F ? o <= F : o >= F; r = p <= F ? ++o : --o)
            this.cp[r] > this.cp[e] && D++;
        return D % 2;
      },
      // Parity of the edges permutation. Parity of corners and edges are
      // the same if the cube is solvable.
      edgeParity: function() {
        var e, r, i, o, t, u, p, F, D;
        for (D = 0, e = i = t = v, u = he + 1; t <= u ? i <= u : i >= u; e = t <= u ? ++i : --i)
          for (r = o = p = e - 1, F = he; p <= F ? o <= F : o >= F; r = p <= F ? ++o : --o)
            this.ep[r] > this.ep[e] && D++;
        return D % 2;
      },
      // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
      URFtoDLF: M("corners", pe, K),
      // Permutation of the three edges UR, UF, UL
      URtoUL: M("edges", he, ke),
      // Permutation of the three edges UB, DR, DF
      UBtoDF: M("edges", ne, O),
      // Permutation of the six edges UR, UF, UL, UB, DR, DF
      URtoDF: M("edges", he, O),
      // Permutation of the equator slice edges FR, FL, BL and BR
      FRtoBR: M("edges", Z, v, !0)
    };
    for (l in me)
      q = me[l], a.prototype[l] = q;
    z = function(e, r, i) {
      var o, t, u, p, F, D, N, y, s, c, L;
      for (o = e === "corners" ? "cornerMultiply" : "edgeMultiply", t = new a(), L = [], u = D = 0, c = i - 1; 0 <= c ? D <= c : D >= c; u = 0 <= c ? ++D : --D) {
        for (t[r](u), p = [], F = y = 0; y <= 5; F = ++y) {
          for (N = a.moves[F], s = 0; s <= 2; ++s)
            t[o](N), p.push(t[r]());
          t[o](N);
        }
        L.push(p);
      }
      return L;
    }, m = (function() {
      var e, r;
      return e = new a(), r = new a(), function(i, o) {
        var t, u;
        for (e.URtoUL(i), r.UBtoDF(o), t = u = 0; u <= 7; t = ++u)
          if (e.ep[t] !== -1) {
            if (r.ep[t] !== -1)
              return -1;
            r.ep[t] = e.ep[t];
          }
        return r.URtoDF();
      };
    })(), W = 2187, G = 2048, le = 2, ee = 11880, _ = 495, x = 24, X = 20160, Y = 20160, re = 1320, te = 1320, a.moveTables = {
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
      twist: ["corners", W],
      flip: ["edges", G],
      FRtoBR: ["edges", ee],
      URFtoDLF: ["corners", X],
      URtoDF: ["edges", Y],
      URtoUL: ["edges", re],
      UBtoDF: ["edges", te],
      mergeURtoDF: []
    }, a.computeMoveTables = function(...e) {
      var r, i, o, t, u, p;
      for (e.length === 0 && (e = (function() {
        var F;
        F = [];
        for (o in g)
          F.push(o);
        return F;
      })()), i = 0, r = e.length; i < r; i++)
        p = e[i], this.moveTables[p] === null && (p === "mergeURtoDF" ? this.moveTables.mergeURtoDF = (function() {
          var F, D, N, y;
          for (y = [], D = N = 0; N <= 335; D = ++N)
            y.push((function() {
              var s, c;
              for (c = [], F = s = 0; s <= 335; F = ++s)
                c.push(m(D, F));
              return c;
            })());
          return y;
        })() : ([t, u] = g[p], this.moveTables[p] = z(t, p, u)));
      return this;
    }, ve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], w = (function() {
      var e, r, i, o, t, u, p, F;
      for (F = [], r = i = 0; i <= 5; r = ++i) {
        for (o = [], e = t = 0; t <= 5; e = ++t)
          if (e !== r && e !== r - 3)
            for (p = u = 0; u <= 2; p = ++u)
              o.push(e * 3 + p);
        F.push(o);
      }
      return F;
    })(), A = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16], S = (function() {
      var e, r, i, o, t, u, p, F, D, N;
      for (N = [], r = o = 0; o <= 5; r = ++o) {
        for (t = [], e = u = 0; u <= 5; e = ++u)
          if (e !== r && e !== r - 3)
            for (D = e === 0 || e === 3 ? [0, 1, 2] : [1], p = 0, i = D.length; p < i; p++)
              F = D[p], t.push(e * 3 + F);
        N.push(t);
      }
      return N;
    })(), d = function(e, r, i) {
      var o, t, u;
      return o = r % 8, u = r >> 3, t = o << 2, i != null ? (e[u] &= ~(15 << t), e[u] |= i << t, i) : (e[u] & 15 << t) >>> t;
    }, J = function(e, r, i, o) {
      var t, u, p, F, D, N, y, s, c, L, U, T;
      for (T = (function() {
        var j, I, ie;
        for (ie = [], j = 0, I = Math.ceil(r / 8) - 1; 0 <= I ? j <= I : j >= I; 0 <= I ? ++j : --j)
          ie.push(4294967295);
        return ie;
      })(), e === 1 ? s = ve : s = A, u = 0, d(T, 0, u), p = 1; p !== r; ) {
        for (F = N = 0, U = r - 1; 0 <= U ? N <= U : N >= U; F = 0 <= U ? ++N : --N)
          if (d(T, F) === u)
            for (t = i(F), L = 0, D = s.length; L < D; L++)
              y = s[L], c = o(t, y), d(T, c) === 15 && (d(T, c, u + 1), p++);
        u++;
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
        _ * W,
        function(e) {
          return [
            e % _,
            e / _ | 0
          ];
        },
        function(e, r) {
          var i, o, t, u;
          return [
            t,
            u
          ] = e, i = a.moveTables.FRtoBR[t * 24][r] / 24 | 0, o = a.moveTables.twist[u][r], o * _ + i;
        }
      ],
      sliceFlip: [
        1,
        _ * G,
        function(e) {
          return [
            e % _,
            e / _ | 0
          ];
        },
        function(e, r) {
          var i, o, t, u;
          return [
            u,
            i
          ] = e, t = a.moveTables.FRtoBR[u * 24][r] / 24 | 0, o = a.moveTables.flip[i][r], o * _ + t;
        }
      ],
      sliceURFtoDLFParity: [
        2,
        x * X * le,
        function(e) {
          return [
            e % 2,
            (e / 2 | 0) % x,
            (e / 2 | 0) / x | 0
          ];
        },
        function(e, r) {
          var i, o, t, u, p, F;
          return [
            p,
            F,
            i
          ] = e, o = a.moveTables.parity[p][r], t = a.moveTables.FRtoBR[F][r], u = a.moveTables.URFtoDLF[i][r], (u * x + t) * 2 + o;
        }
      ],
      sliceURtoDFParity: [
        2,
        x * Y * le,
        function(e) {
          return [
            e % 2,
            (e / 2 | 0) % x,
            (e / 2 | 0) / x | 0
          ];
        },
        function(e, r) {
          var i, o, t, u, p, F;
          return [
            p,
            F,
            i
          ] = e, o = a.moveTables.parity[p][r], t = a.moveTables.FRtoBR[F][r], u = a.moveTables.URtoDF[i][r], (u * x + t) * 2 + o;
        }
      ]
    }, a.computePruningTables = function(...e) {
      var r, i, o, t, u;
      for (e.length === 0 && (e = (function() {
        var p;
        p = [];
        for (o in b)
          p.push(o);
        return p;
      })()), i = 0, r = e.length; i < r; i++)
        u = e[i], this.pruningTables[u] === null && (t = b[u], this.pruningTables[u] = J(...t));
      return this;
    }, a.initSolver = function() {
      return a.computeMoveTables(), a.computePruningTables();
    }, a.prototype.solveUpright = function(e = 22) {
      var r, i, o, t, u, p, F, D, N;
      return o = (function() {
        var y, s, c, L, U, T, j;
        for (s = ["U", "R", "F", "D", "L", "B"], T = ["", "2", "'"], j = [], y = c = 0; c <= 5; y = ++c)
          for (U = L = 0; L <= 2; U = ++L)
            j.push(s[y] + T[U]);
        return j;
      })(), r = class {
        constructor(s) {
          this.parent = null, this.lastMove = null, this.depth = 0, s && this.init(s);
        }
        init(s) {
          return this.flip = s.flip(), this.twist = s.twist(), this.slice = s.FRtoBR() / x | 0, this.parity = s.cornerParity(), this.URFtoDLF = s.URFtoDLF(), this.FRtoBR = s.FRtoBR(), this.URtoUL = s.URtoUL(), this.UBtoDF = s.UBtoDF(), this;
        }
        solution() {
          return this.parent ? this.parent.solution() + o[this.lastMove] + " " : "";
        }
        //# Helpers
        move(s, c, L) {
          return a.moveTables[s][c][L];
        }
        pruning(s, c) {
          return d(a.pruningTables[s], c);
        }
        //# Phase 1
        // Return the next valid phase 1 moves for this state
        moves1() {
          return this.lastMove !== null ? w[this.lastMove / 3 | 0] : ve;
        }
        // Compute the minimum number of moves to the end of phase 1
        minDist1() {
          var s, c;
          return s = this.pruning("sliceFlip", _ * this.flip + this.slice), c = this.pruning("sliceTwist", _ * this.twist + this.slice), f(s, c);
        }
        // Compute the next phase 1 state for the given move
        next1(s) {
          var c;
          return c = i.pop(), c.parent = this, c.lastMove = s, c.depth = this.depth + 1, c.flip = this.move("flip", this.flip, s), c.twist = this.move("twist", this.twist, s), c.slice = this.move("FRtoBR", this.slice * 24, s) / 24 | 0, c;
        }
        //# Phase 2
        // Return the next valid phase 2 moves for this state
        moves2() {
          return this.lastMove !== null ? S[this.lastMove / 3 | 0] : A;
        }
        // Compute the minimum number of moves to the solved cube
        minDist2() {
          var s, c, L, U;
          return L = (x * this.URtoDF + this.FRtoBR) * le + this.parity, s = this.pruning("sliceURtoDFParity", L), U = (x * this.URFtoDLF + this.FRtoBR) * le + this.parity, c = this.pruning("sliceURFtoDLFParity", U), f(s, c);
        }
        // Initialize phase 2 coordinates
        init2(s = !0) {
          if (this.parent !== null && (this.parent.init2(!1), this.URFtoDLF = this.move("URFtoDLF", this.parent.URFtoDLF, this.lastMove), this.FRtoBR = this.move("FRtoBR", this.parent.FRtoBR, this.lastMove), this.parity = this.move("parity", this.parent.parity, this.lastMove), this.URtoUL = this.move("URtoUL", this.parent.URtoUL, this.lastMove), this.UBtoDF = this.move("UBtoDF", this.parent.UBtoDF, this.lastMove), s))
            return this.URtoDF = this.move("mergeURtoDF", this.URtoUL, this.UBtoDF);
        }
        // Compute the next phase 2 state for the given move
        next2(s) {
          var c;
          return c = i.pop(), c.parent = this, c.lastMove = s, c.depth = this.depth + 1, c.URFtoDLF = this.move("URFtoDLF", this.URFtoDLF, s), c.FRtoBR = this.move("FRtoBR", this.FRtoBR, s), c.parity = this.move("parity", this.parity, s), c.URtoDF = this.move("URtoDF", this.URtoDF, s), c;
        }
      }, D = null, u = function(y) {
        var s, c, L, U;
        for (s = 0, U = [], s = c = 1, L = e; (1 <= L ? c <= L : c >= L) && (t(y, s), D === null); s = 1 <= L ? ++c : --c)
          U.push(s++);
        return U;
      }, t = function(y, s) {
        var c, L, U, T, j, I, ie;
        if (s === 0) {
          if (y.minDist1() === 0 && (y.lastMove === null || (j = y.lastMove, $.call(A, j) < 0)))
            return F(y);
        } else if (s > 0 && y.minDist1() <= s) {
          for (I = y.moves1(), ie = [], L = 0, c = I.length; L < c && (U = I[L], T = y.next1(U), t(T, s - 1), i.push(T), D === null); L++)
            ie.push(void 0);
          return ie;
        }
      }, F = function(y) {
        var s, c, L, U;
        for (y.init2(), U = [], s = c = 1, L = e - y.depth; (1 <= L ? c <= L : c >= L) && (p(y, s), D === null); s = 1 <= L ? ++c : --c)
          U.push(s++);
        return U;
      }, p = function(y, s) {
        var c, L, U, T, j, I;
        if (s === 0) {
          if (y.minDist2() === 0)
            return D = y.solution();
        } else if (s > 0 && y.minDist2() <= s) {
          for (j = y.moves2(), I = [], L = 0, c = j.length; L < c && (U = j[L], T = y.next2(U), p(T, s - 1), i.push(T), D === null); L++)
            I.push(void 0);
          return I;
        }
      }, i = (function() {
        var y, s, c;
        for (c = [], y = 0, s = e + 1; 0 <= s ? y <= s : y >= s; 0 <= s ? ++y : --y)
          c.push(new r());
        return c;
      })(), N = i.pop().init(this), u(N), i.push(N), D.length > 0 && (D = D.substring(0, D.length - 1)), D;
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
      var r, i, o, t, u, p, F, D, N;
      for (r = this.clone(), D = r.upright(), r.move(D), p = new a().move(D).center, N = r.solveUpright(e), F = [], u = N.split(" "), o = 0, i = u.length; o < i; o++)
        t = u[o], F.push(B[p[C[t[0]]]]), t.length > 1 && (F[F.length - 1] += t[1]);
      return F.join(" ");
    }, a.scramble = function() {
      return a.inverse(a.random().solve());
    };
  }).call(_e)), _e;
}
var Ae, Ye;
function ut() {
  return Ye || (Ye = 1, Ae = et(), st()), Ae;
}
var ft = ut();
const we = /* @__PURE__ */ it(ft), Je = 4294967296;
function tt() {
  const n = globalThis.crypto;
  if (!(n != null && n.getRandomValues))
    throw new Error(
      "Web Crypto is required. Use a secure browser context or a supported Node.js runtime."
    );
  const v = new Uint32Array(1);
  return n.getRandomValues(v), v[0];
}
function rt(n, v = tt) {
  if (!Number.isSafeInteger(n) || n < 1 || n > Je)
    throw new RangeError("Invalid random integer range");
  const R = Math.floor(Je / n) * n;
  for (; ; ) {
    const a = v();
    if (!Number.isInteger(a) || a < 0 || a >= Je)
      throw new RangeError("Random source must return a uint32");
    if (a < R)
      return a % n;
  }
}
function lt(n, v = tt) {
  const R = [...n];
  for (let a = R.length - 1; a > 0; a--) {
    const P = rt(a + 1, v);
    [R[a], R[P]] = [R[P], R[a]];
  }
  return R;
}
function He(n, v) {
  if (!Number.isSafeInteger(n) || n < 1)
    throw new RangeError("Permutation size must be a positive integer");
  return lt(
    Array.from({ length: n }, (R, a) => a),
    v
  );
}
function Pe(n) {
  let v = 0;
  for (let R = 0; R < n.length; R++)
    for (let a = R + 1; a < n.length; a++)
      n[R] > n[a] && (v ^= 1);
  return v;
}
function Ke(n, v) {
  return !Array.isArray(n) || n.length !== v ? !1 : new Set(n).size === v && n.every(
    (a) => Number.isInteger(a) && a >= 0 && a < v
  );
}
function ct(n) {
  return Array.isArray(n) && n.length === 6 && n.every((v, R) => v === R);
}
function Qe(n, v, R) {
  return !Array.isArray(n) || n.length !== v || !n.every(
    (a) => Number.isInteger(a) && a >= 0 && a < R
  ) ? !1 : n.reduce((a, P) => a + P, 0) % R === 0;
}
function at(n) {
  if (!n || typeof n != "object")
    return !1;
  const { center: v, cp: R, co: a, ep: P, eo: V } = n;
  return v !== void 0 && !ct(v) || !Ke(R, 8) || !Ke(P, 12) || !Qe(a, 8, 3) || !Qe(V, 12, 2) ? !1 : Pe(R) === Pe(P);
}
function ht(n) {
  if (!at(n))
    throw new Error("Invalid 3x3 cube state");
  return n;
}
function Ze(n, v, R) {
  const a = [];
  let P = 0;
  for (let V = 0; V < n - 1; V++) {
    const O = rt(v, R);
    a.push(O), P += O;
  }
  return a.push((v - P % v) % v), a;
}
function pt(n) {
  let v, R;
  do
    v = He(8, n), R = He(12, n);
  while (Pe(v) !== Pe(R));
  return {
    center: [0, 1, 2, 3, 4, 5],
    cp: v,
    co: Ze(8, 3, n),
    ep: R,
    eo: Ze(12, 2, n)
  };
}
let Ce;
async function vt() {
  Ce || (Ce = Promise.resolve().then(() => {
    we.initSolver();
  }));
  try {
    await Ce;
  } catch (n) {
    throw Ce = void 0, n;
  }
}
function $e(n) {
  return ht(n), new we({
    center: n.center ?? [0, 1, 2, 3, 4, 5],
    cp: n.cp,
    co: n.co,
    ep: n.ep,
    eo: n.eo
  });
}
function mt(n) {
  const v = $e(n), R = v.solve();
  if (typeof R != "string" || !R.trim())
    throw new Error("Solver did not return a valid solution");
  if (!v.clone().move(R).isSolved())
    throw new Error("Solver returned a solution that failed verification");
  return R.trim();
}
function Ft(n) {
  return we.inverse(n).trim();
}
const Rt = ["U", "R", "F", "D", "L", "B"], wt = ["", "2", "'"];
let ze;
function gt() {
  if (!ze) {
    const n = /* @__PURE__ */ new Set();
    n.add(new we().asString());
    for (const v of Rt)
      for (const R of wt)
        n.add(
          new we().move(v + R).asString()
        );
    ze = n;
  }
  return ze;
}
function Ut(n) {
  const v = $e(n);
  return !gt().has(v.asString());
}
function dt(n) {
  for (; ; ) {
    const v = pt(n);
    if (Ut(v))
      return {
        stateData: v,
        cube: $e(v)
      };
  }
}
async function Dt(n) {
  await vt();
  const { stateData: v, cube: R } = dt(n), a = mt(v), P = Ft(a);
  if (new we().move(P).asString() !== R.asString())
    throw new Error(
      "Scramble replay failed: generated state does not match target"
    );
  if (!R.clone().move(a).isSolved())
    throw new Error(
      "Solution verification failed: target did not return to solved"
    );
  return {
    event: "333",
    notation: P,
    moves: P.split(/\s+/),
    state: v
  };
}
function yt(n) {
  if (typeof n != "string" || !/^[a-z0-9]+$/.test(n))
    throw new TypeError(
      "Event ID must be a non-empty lowercase alphanumeric string"
    );
}
function bt(n) {
  if (typeof n != "function")
    throw new TypeError("Event generator must be a function");
}
function Lt() {
  const n = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(v, R) {
      if (yt(v), bt(R), n.has(v))
        throw new RangeError(`Event "${v}" is already registered`);
      n.set(v, R);
    },
    get(v) {
      return n.get(v);
    },
    list() {
      return Object.freeze([...n.keys()]);
    }
  });
}
const qe = Lt();
let nt = Object.freeze([]);
function Bt(n, v) {
  qe.register(n, v), nt = qe.list();
}
function St(n) {
  return qe.get(n);
}
Bt("333", ({ randomWord: n } = {}) => Dt(n));
async function Mt(n = "333", v = {}) {
  if (!v || typeof v != "object" || Array.isArray(v))
    throw new TypeError("options must be an object");
  if (v.randomWord !== void 0 && typeof v.randomWord != "function")
    throw new TypeError("options.randomWord must be a function");
  const R = St(n);
  if (!R)
    throw new RangeError(
      `Unsupported event "${n}". Supported events: ${nt.join(", ")}`
    );
  return await R(v);
}
export {
  nt as events,
  Mt as generate,
  Bt as registerEvent
};
