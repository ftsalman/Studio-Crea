/**
 * FieryRibs — a lightweight raw-WebGL renderer that recreates the StudioCrea
 * "fiery ribbed glass" brand texture: a flowing red/orange noise field seen
 * through vertical glass ribs, reacting to the pointer.
 *
 * Usage:
 *   const fx = new FieryRibs(canvas, { ribs: 64 })
 *   fx.start(); ... fx.destroy()
 */

const VERT = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uHover;
uniform float uRibs;
uniform float uRefract;
uniform float uScroll;

// Simplex 3D noise — Ashima Arts / Stefan Gustavson (MIT)
vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// StudioCrea palette
const vec3 C_DEEP   = vec3(0.32, 0.01, 0.00);
const vec3 C_RED    = vec3(0.91, 0.07, 0.02);
const vec3 C_ORANGE = vec3(1.00, 0.38, 0.06);
const vec3 C_AMBER  = vec3(1.00, 0.62, 0.16);

vec3 palette(float f){
  vec3 c = mix(C_DEEP, C_RED, smoothstep(0.05, 0.45, f));
  c = mix(c, C_ORANGE, smoothstep(0.50, 0.78, f));
  c = mix(c, C_AMBER, smoothstep(0.82, 1.0, f));
  return c;
}

float field(vec2 p){
  float t = uTime;
  vec2 q = p;
  q.y += uScroll * 0.6;
  float n  = snoise(vec3(q * vec2(0.9, 0.45), t * 0.07)) * 0.60;
  n += snoise(vec3(q * vec2(2.1, 0.9) + 7.3, t * 0.11)) * 0.28;
  n += snoise(vec3(q * 4.2 - 3.1, t * 0.17)) * 0.12;
  float d = distance(p, uMouse);
  n += uHover * 0.75 * exp(-d * d * 5.0);
  return clamp(n * 0.55 + 0.52, 0.0, 1.0);
}

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);

  // vertical glass ribs
  float rx = vUv.x * uRibs;
  float local = fract(rx) - 0.5;
  float ribId = floor(rx);
  float jitter = (hash(vec2(ribId, 1.0)) - 0.5) * 0.02;
  vec2 sp = p + vec2(local * uRefract + jitter, local * 0.02);

  float f = field(sp);
  vec3 col = palette(f);

  // rib shading: darker edges + soft specular core
  float edge = smoothstep(0.5, 0.36, abs(local));
  col *= 0.78 + 0.22 * edge;
  float spec = pow(1.0 - abs(local + 0.18) * 2.0, 10.0);
  col += vec3(1.0, 0.6, 0.25) * spec * 0.10 * f;

  // vignette + grain
  float v = smoothstep(1.25, 0.25, length(p * vec2(0.8, 1.0)));
  col *= mix(0.55, 1.0, v);
  col += (hash(vUv * uRes + uTime) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`

const lerp = (a, b, t) => a + (b - a) * t

export class FieryRibs {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.opts = { ribs: 70, refract: 0.09, maxDpr: 1.5, ...opts }
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    this.hover = { v: 0, t: 0 }
    this.scroll = 0
    this.time = Math.random() * 100
    this.running = false
    this.visible = true

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) {
      this.failed = true
      return
    }
    this.gl = gl
    this.program = this.#createProgram(VERT, FRAG)
    gl.useProgram(this.program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(this.program, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    this.u = {}
    ;['uRes', 'uTime', 'uMouse', 'uHover', 'uRibs', 'uRefract', 'uScroll'].forEach((n) => {
      this.u[n] = gl.getUniformLocation(this.program, n)
    })

    this.onResize = this.onResize.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerLeave = () => (this.hover.t = 0)
    this.tick = this.tick.bind(this)

    window.addEventListener('resize', this.onResize)
    window.addEventListener('pointermove', this.onPointerMove)
    document.addEventListener('pointerleave', this.onPointerLeave)

    this.io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting))
    this.io.observe(canvas)
    this.onResize()
  }

  #createProgram(vs, fs) {
    const gl = this.gl
    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
      return s
    }
    const p = gl.createProgram()
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vs))
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(p)
    return p
  }

  onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr)
    const { clientWidth: w, clientHeight: h } = this.canvas
    this.canvas.width = Math.max(1, Math.floor(w * dpr))
    this.canvas.height = Math.max(1, Math.floor(h * dpr))
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    // fewer ribs on narrow screens so they stay readable
    this.ribs = w < 700 ? this.opts.ribs * 0.45 : this.opts.ribs
  }

  onPointerMove(e) {
    const r = this.canvas.getBoundingClientRect()
    const aspect = r.width / r.height
    const nx = (e.clientX - r.left) / r.width
    const ny = 1 - (e.clientY - r.top) / r.height
    this.mouse.tx = (nx - 0.5) * aspect
    this.mouse.ty = ny - 0.5
    const inside = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1
    this.hover.t = inside ? 1 : 0
  }

  setScroll(v) {
    this.scroll = v
  }

  start() {
    if (this.failed || this.running) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
  }

  tick(now) {
    if (!this.running) return
    this.raf = requestAnimationFrame(this.tick)
    const dt = Math.min((now - this.last) / 1000, 0.05)
    this.last = now
    if (!this.visible) return

    this.time += dt
    this.mouse.x = lerp(this.mouse.x, this.mouse.tx, 0.06)
    this.mouse.y = lerp(this.mouse.y, this.mouse.ty, 0.06)
    this.hover.v = lerp(this.hover.v, this.hover.t, 0.04)

    const gl = this.gl
    gl.uniform2f(this.u.uRes, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.u.uTime, this.time)
    gl.uniform2f(this.u.uMouse, this.mouse.x, this.mouse.y)
    gl.uniform1f(this.u.uHover, this.hover.v)
    gl.uniform1f(this.u.uRibs, this.ribs)
    gl.uniform1f(this.u.uRefract, this.opts.refract)
    gl.uniform1f(this.u.uScroll, this.scroll)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  destroy() {
    this.stop()
    if (this.failed) return
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('pointermove', this.onPointerMove)
    document.removeEventListener('pointerleave', this.onPointerLeave)
    this.io.disconnect()
    this.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

export default FieryRibs
