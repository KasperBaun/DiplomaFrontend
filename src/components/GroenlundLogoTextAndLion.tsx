interface IGroendlundLogoProps {
    width?: number;
    color?: string;
}

const GroendlundLogo: React.FC<IGroendlundLogoProps> = (props: IGroendlundLogoProps) => {

    const width = props.width ? props.width : 393;
    const height = props.width ? (props.width / 1.7012987) : 231;
    const color = props.color ? props.color : 'white';
    return (
        <svg
            style={{ width: `${width}`, height: `${height}`, color: `${color}` }}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="1197.000000pt"
            height="492.000000pt"
            viewBox="0 0 1197.000000 492.000000"
            preserveAspectRatio="xMidYMid meet"
        >

            <g
                transform={`translate(0.000000,492.000000) scale(0.100000,-0.100000)`}
                fill={color}
                stroke="none">

                <path d="M5775 4711 c-94 -13 -142 -29 -181 -63 -70 -62 -80 -122 -40 -238 36
-101 41 -166 22 -253 -9 -41 -23 -83 -31 -93 -13 -17 -14 -15 -15 28 0 108
-64 235 -194 387 -111 129 -200 177 -351 188 -84 6 -233 -14 -293 -40 l-32
-13 25 -24 c27 -26 32 -57 13 -82 -13 -17 -70 -48 -122 -68 -24 -9 -28 -15
-24 -41 4 -26 0 -32 -26 -46 -17 -8 -59 -35 -93 -60 -77 -54 -88 -82 -47 -124
15 -16 36 -29 46 -29 13 0 18 -8 18 -29 0 -38 17 -54 101 -97 l69 -34 -6 39
c-9 58 1 91 29 91 41 0 60 -26 71 -99 8 -52 -9 -111 -31 -111 -9 0 -31 9 -49
21 -19 11 -34 17 -34 12 0 -4 8 -45 17 -90 11 -54 22 -83 30 -83 8 0 36 11 63
25 27 14 52 25 56 25 3 0 -22 -30 -56 -67 -91 -97 -115 -154 -114 -273 1 -109
20 -190 60 -258 l29 -47 6 73 c4 41 10 90 14 110 7 37 7 36 25 -34 22 -84 54
-152 104 -218 l36 -46 -54 -120 c-59 -129 -90 -180 -110 -180 -7 0 -34 18 -59
40 -25 22 -51 40 -59 40 -13 0 -109 -120 -172 -215 -51 -77 -55 -75 197 -75
l223 0 59 78 c104 135 284 334 336 372 l26 19 51 -102 c28 -56 54 -115 57
-130 8 -30 -5 -36 -25 -12 -26 31 -47 15 -134 -99 -47 -63 -86 -117 -86 -120
0 -3 81 -6 180 -6 206 0 213 2 262 80 38 60 64 149 88 306 11 71 24 145 30
164 16 54 12 84 -16 125 -14 21 -22 41 -17 45 27 25 364 120 423 120 l30 0 0
-69 c0 -89 18 -138 84 -225 102 -135 125 -211 86 -291 -32 -66 -56 -75 -136
-46 -36 13 -70 21 -77 18 -12 -5 -167 -211 -167 -222 0 -3 97 -5 215 -5 l216
0 53 34 c29 18 77 62 107 97 30 35 77 86 106 114 l52 51 -26 80 c-20 62 -26
100 -27 176 0 53 2 99 5 102 5 5 148 -77 391 -225 127 -77 195 -153 186 -211
-2 -18 -10 -24 -35 -26 -26 -3 -41 5 -77 38 -25 23 -50 39 -56 35 -35 -22
-100 -174 -100 -235 l0 -30 184 0 c180 0 184 0 221 26 87 59 110 116 102 252
-6 108 -48 285 -73 313 -10 11 -27 19 -38 19 -62 0 -123 75 -197 245 -24 55
-74 146 -111 202 -37 56 -68 104 -68 107 0 4 21 -4 48 -17 122 -62 377 -151
552 -194 88 -21 120 -25 200 -20 161 9 314 78 427 194 63 65 91 112 72 123 -7
5 -19 6 -27 2 -8 -3 -13 -1 -10 4 42 88 56 152 41 192 l-9 23 -47 -32 c-98
-65 -175 -157 -196 -236 -13 -48 -50 -85 -116 -115 -72 -33 -219 -33 -325 0
-111 36 -282 104 -502 203 -237 107 -442 170 -762 235 -66 13 -122 26 -124 29
-3 3 8 35 25 72 28 64 31 68 59 65 16 -2 76 -21 133 -43 58 -21 108 -39 113
-39 5 0 27 12 49 26 31 19 48 24 70 19 18 -4 60 1 101 11 55 13 75 14 89 5 26
-16 30 -15 99 24 l62 35 39 -31 c21 -17 39 -35 39 -41 0 -11 8 -9 80 17 25 9
88 22 140 29 l95 12 -132 72 c-368 202 -667 316 -950 361 -137 22 -388 34
-478 22z m336 -41 c299 -30 551 -110 904 -287 94 -47 174 -88 178 -92 4 -4
-29 -17 -74 -30 l-82 -22 -26 24 c-45 40 -102 74 -211 126 -290 137 -527 194
-810 195 -171 1 -210 -7 -260 -54 -36 -33 -44 -88 -11 -70 11 5 22 18 25 28
17 51 226 87 226 38 0 -14 -33 -30 -85 -42 -36 -8 -57 -23 -49 -35 3 -5 41 -9
84 -9 43 0 81 -4 85 -10 8 -13 -32 -37 -87 -51 -29 -7 -48 -17 -48 -25 0 -11
19 -14 85 -14 77 0 85 -2 85 -19 0 -21 -62 -51 -104 -51 -43 0 -39 -27 7 -42
71 -22 52 -78 -28 -78 -67 0 -75 -35 -10 -44 24 -4 47 -11 50 -16 10 -17 -40
-39 -95 -44 -70 -5 -82 -31 -19 -41 37 -6 40 -9 26 -22 -8 -9 -39 -24 -69 -34
-62 -21 -70 -43 -15 -47 35 -3 45 -15 29 -37 -13 -19 -57 -42 -144 -75 -196
-73 -135 -131 88 -82 148 33 247 116 328 278 l35 71 134 -28 c293 -61 526
-127 652 -184 597 -271 757 -317 921 -267 97 30 164 83 179 142 15 62 52 116
121 180 55 49 59 52 62 30 2 -12 -15 -61 -38 -108 -38 -77 -41 -87 -26 -98 15
-10 10 -18 -39 -62 -102 -93 -254 -152 -395 -152 -166 0 -554 126 -823 267
-43 22 -77 38 -77 34 0 -3 26 -40 57 -81 91 -122 158 -223 186 -281 14 -30 43
-93 65 -141 48 -105 119 -183 176 -193 34 -7 37 -10 56 -75 33 -112 52 -261
40 -317 -13 -55 -49 -107 -90 -128 -42 -22 -340 -22 -340 0 0 20 37 117 54
140 13 18 15 17 57 -13 111 -82 211 13 131 124 -47 64 -114 117 -255 199 -361
212 -416 254 -485 362 l-27 43 -65 0 c-150 -1 -416 -49 -603 -111 -236 -77
-390 -174 -592 -374 -130 -128 -168 -171 -272 -302 l-66 -83 -189 0 c-149 0
-188 3 -182 13 26 45 138 187 148 187 7 0 23 -11 35 -24 13 -14 36 -30 51 -36
59 -25 93 17 194 243 119 266 224 405 423 559 56 44 105 84 109 90 4 6 -31 -9
-76 -33 -141 -73 -331 -273 -411 -431 -16 -32 -31 -58 -33 -58 -11 0 -89 135
-107 185 -29 85 -35 195 -15 273 21 82 21 82 -10 41 -44 -59 -63 -104 -80
-194 -15 -74 -19 -84 -27 -64 -5 13 -10 71 -11 129 -1 129 15 169 111 271 48
50 64 74 61 91 -4 32 -48 35 -98 7 -44 -25 -46 -25 -55 13 -6 23 -4 26 14 21
31 -8 69 22 80 64 16 58 -4 160 -40 195 -50 51 -121 28 -136 -42 -7 -35 -8
-36 -50 -10 -36 21 -42 49 -21 95 15 34 7 39 -36 24 -32 -11 -38 -11 -53 4
-16 16 -15 18 7 42 22 23 136 97 172 110 14 5 15 12 7 32 -5 14 -8 27 -7 28 2
1 29 14 60 29 86 41 117 92 88 146 -11 21 -10 22 88 41 86 16 223 7 294 -21
101 -38 252 -199 324 -346 33 -66 38 -87 42 -163 4 -74 0 -97 -21 -160 l-26
-74 28 27 c50 47 102 132 128 208 37 103 35 211 -5 332 -36 107 -31 145 22
192 34 29 74 42 176 58 53 8 223 6 321 -4z m81 -136 c148 -20 253 -45 368 -87
113 -41 288 -117 319 -139 22 -16 22 -16 -25 -42 -29 -16 -51 -23 -58 -17 -20
16 -218 98 -325 135 -156 54 -381 106 -460 106 -4 0 -6 14 -3 30 5 36 18 37
184 14z m3 -111 c140 -27 495 -151 495 -174 0 -4 -16 -11 -35 -15 -28 -5 -55
2 -133 34 -165 69 -296 106 -414 118 -38 4 -68 10 -68 13 0 3 3 15 6 27 6 23
15 23 149 -3z m-10 -88 c117 -22 335 -96 335 -114 0 -3 -13 -12 -29 -19 -26
-11 -36 -10 -88 11 -91 39 -188 66 -258 73 -63 7 -65 8 -65 35 0 34 0 34 105
14z m-81 -81 c28 -4 46 -12 46 -20 0 -7 -27 -73 -61 -147 -110 -244 -209 -330
-405 -352 l-59 -6 84 35 c132 56 159 81 147 137 -4 23 -1 31 17 40 28 15 46
39 47 60 0 9 11 20 25 23 28 7 56 54 49 82 -3 12 3 27 15 38 23 21 28 65 9 84
-10 10 -10 15 2 22 18 12 24 12 84 4z m340 -915 c27 -38 65 -79 83 -90 30 -19
33 -25 28 -55 -3 -19 -7 -49 -10 -68 -7 -44 12 -168 36 -231 l19 -49 -33 -27
c-17 -15 -54 -55 -82 -88 -27 -34 -76 -82 -108 -107 l-59 -44 -179 0 -179 0
51 70 c28 38 54 72 58 74 4 3 31 -4 60 -14 28 -11 62 -20 75 -20 61 0 133 116
123 195 -9 63 -43 132 -104 213 -68 91 -79 119 -88 208 -6 55 -4 73 6 80 18
11 97 21 184 22 l70 1 49 -70z m-820 -132 c28 -37 32 -63 16 -117 -6 -19 -17
-82 -26 -140 -28 -200 -58 -292 -113 -344 -28 -27 -28 -27 -169 -24 l-141 3
60 77 60 78 28 -21 c24 -18 32 -19 51 -9 33 18 23 68 -44 206 -31 64 -56 120
-56 123 0 19 273 201 302 201 4 0 18 -15 32 -33z"/>
                <path d="M2204 2173 c-20 -32 -37 -59 -39 -61 -1 -1 -24 7 -51 19 -74 33 -192
31 -260 -3 -97 -50 -153 -130 -180 -257 -28 -132 -12 -278 40 -381 l33 -65
-48 -77 -49 -78 40 0 c36 0 41 3 66 48 43 75 41 73 83 52 57 -30 149 -36 226
-15 50 13 78 28 117 64 83 74 118 177 118 344 0 104 -18 188 -57 258 l-25 48
45 74 c25 42 43 78 40 81 -4 3 -19 6 -34 6 -24 0 -35 -10 -65 -57z m-133 -94
c53 -37 54 -33 -55 -214 -174 -288 -191 -315 -200 -318 -19 -4 -29 61 -30 203
-1 171 14 238 70 300 54 60 152 74 215 29z m98 -180 c16 -74 14 -264 -4 -333
-19 -73 -59 -133 -105 -158 -63 -35 -168 -12 -203 43 -7 11 20 64 108 210 65
107 132 217 149 246 17 28 34 49 38 47 3 -2 11 -27 17 -55z"/>
                <path d="M473 2150 c-165 -35 -263 -190 -263 -415 0 -160 36 -263 115 -333 73
-64 183 -80 297 -41 l61 20 21 -20 c14 -13 29 -18 44 -14 21 5 22 9 22 150 l0
145 30 28 c16 15 26 30 23 34 -3 3 -57 6 -120 6 -91 0 -113 -3 -113 -14 0 -8
9 -18 20 -21 40 -13 52 -48 49 -140 -4 -77 -7 -87 -32 -112 -24 -25 -34 -28
-95 -28 -59 0 -73 4 -104 27 -72 55 -103 171 -96 360 6 152 28 217 92 276 88
81 220 60 262 -42 16 -39 23 -46 47 -46 l27 0 0 79 0 79 -43 10 c-62 16 -195
22 -244 12z"/>
                <path d="M6757 2146 c-143 -39 -187 -158 -112 -302 19 -37 35 -68 35 -69 0 -1
-24 -18 -54 -39 -98 -67 -138 -154 -115 -249 23 -99 125 -156 256 -144 64 6
154 39 174 63 18 22 39 17 80 -20 63 -57 145 -58 213 -2 21 18 27 29 21 45
l-6 21 -29 -20 c-15 -11 -39 -20 -53 -20 -26 0 -104 52 -113 75 -4 9 12 35 39
65 54 60 88 129 95 193 l5 47 -82 0 c-82 0 -100 -9 -58 -31 30 -16 37 -28 37
-65 0 -33 -42 -125 -67 -145 -13 -11 -19 -8 -42 18 -14 17 -59 69 -98 116 -40
46 -73 88 -73 93 0 5 30 26 66 48 110 66 156 143 134 225 -13 51 -56 86 -120
100 -62 13 -72 13 -133 -3z m140 -71 c17 -19 23 -39 23 -73 0 -59 -31 -108
-97 -153 l-46 -32 -24 29 c-36 45 -56 124 -44 172 10 37 40 73 71 85 33 13 95
-2 117 -28z m-72 -471 c55 -68 100 -129 100 -136 0 -24 -66 -51 -139 -56 -85
-5 -126 11 -156 61 -22 36 -27 124 -9 160 15 30 81 97 94 96 5 0 55 -56 110
-125z"/>
                <path d="M9833 2150 c-91 -19 -162 -75 -206 -165 -39 -79 -50 -148 -45 -281 6
-147 30 -217 98 -285 117 -118 351 -99 453 36 116 154 113 471 -7 612 -55 65
-192 104 -293 83z m154 -71 c21 -13 43 -42 62 -82 77 -157 62 -456 -26 -550
-70 -74 -173 -75 -245 -2 -110 111 -108 520 3 621 51 46 143 52 206 13z"/>
                <path d="M940 2135 c0 -8 5 -15 10 -15 6 0 22 -11 35 -25 l25 -24 0 -315 c0
-178 -4 -326 -10 -340 -5 -14 -20 -28 -35 -32 -14 -3 -25 -12 -25 -20 0 -11
25 -14 125 -14 104 0 125 3 125 15 0 8 -11 17 -25 21 -14 3 -30 14 -35 24 -6
10 -10 80 -10 156 l0 136 60 -4 c45 -3 66 -10 83 -26 12 -13 58 -89 103 -170
l80 -147 82 -3 c68 -2 82 0 82 13 0 8 -6 15 -14 15 -25 0 -73 60 -129 164 -33
60 -73 118 -96 139 l-40 36 54 30 c34 19 66 47 82 73 25 37 28 51 28 123 0 73
-3 85 -27 117 -53 69 -131 88 -370 88 -134 0 -158 -2 -158 -15z m332 -45 c84
-24 127 -103 112 -201 -15 -94 -77 -139 -191 -139 l-73 0 0 175 0 175 58 0
c31 0 74 -5 94 -10z"/>
                <path d="M2440 2135 c0 -8 11 -20 24 -25 14 -5 30 -18 35 -29 7 -13 11 -133
11 -340 0 -308 -1 -322 -20 -341 -11 -11 -27 -20 -35 -20 -8 0 -15 -7 -15 -15
0 -12 18 -15 105 -15 113 0 131 10 75 42 l-30 17 0 134 c0 74 -3 209 -7 300
-4 124 -3 167 5 167 7 0 12 -5 12 -10 0 -6 20 -43 43 -83 24 -39 110 -183 191
-319 145 -244 148 -248 180 -248 l33 0 6 66 c4 37 4 179 1 318 -7 297 -1 355
39 374 15 7 27 20 27 28 0 12 -17 14 -102 12 -101 -3 -124 -12 -80 -33 12 -5
26 -21 31 -35 11 -26 20 -530 11 -530 -3 0 -18 24 -32 53 -15 28 -93 162 -175
297 l-148 245 -92 3 c-79 2 -93 0 -93 -13z"/>
                <path d="M3260 2135 c0 -8 5 -15 10 -15 6 0 22 -11 35 -25 l25 -24 0 -315 c0
-178 -4 -326 -10 -340 -5 -14 -20 -28 -35 -32 -14 -3 -25 -12 -25 -20 0 -12
45 -14 265 -14 l265 0 0 84 c0 46 3 98 6 115 7 32 6 32 -26 29 -31 -3 -34 -7
-47 -58 -16 -65 -41 -102 -74 -111 -13 -4 -66 -7 -116 -8 l-93 -1 0 338 c0
185 4 343 9 350 4 8 19 19 31 25 45 23 20 32 -100 35 -102 2 -120 0 -120 -13z"/>
                <path d="M3855 2140 c-3 -5 7 -17 22 -27 15 -10 31 -22 35 -28 4 -5 8 -127 8
-271 0 -306 7 -343 74 -410 50 -50 123 -70 229 -61 102 9 163 45 202 121 l30
60 5 280 5 281 32 20 c60 38 44 46 -84 43 -80 -2 -118 -7 -120 -15 -3 -7 7
-15 22 -19 14 -3 30 -14 35 -24 6 -11 10 -135 10 -296 0 -264 -1 -280 -21
-322 -17 -35 -32 -49 -67 -64 -56 -25 -137 -20 -182 12 -52 37 -60 89 -60 376
0 141 4 264 10 278 5 15 21 31 35 38 14 6 25 17 25 25 0 10 -26 13 -119 13
-66 0 -122 -4 -126 -10z"/>
                <path d="M4650 2136 c0 -8 12 -21 28 -28 l27 -13 3 -343 2 -343 -30 -17 c-56
-32 -39 -42 75 -42 79 0 105 3 105 13 0 7 -13 18 -29 24 -23 8 -31 19 -35 44
-7 43 -13 579 -6 578 3 0 35 -50 71 -112 36 -62 124 -210 195 -329 l129 -218
38 0 37 0 0 360 0 361 25 24 c13 14 29 25 35 25 5 0 10 7 10 15 0 12 -18 15
-105 15 -87 0 -105 -3 -105 -15 0 -9 11 -20 25 -25 14 -5 27 -15 29 -22 10
-31 14 -542 5 -528 -5 8 -87 144 -181 303 l-172 287 -88 0 c-70 0 -88 -3 -88
-14z"/>
                <path d="M5468 2145 c-10 -10 10 -35 28 -35 30 0 34 -41 34 -370 l0 -331 -35
-20 c-19 -12 -35 -25 -35 -31 0 -6 69 -8 193 -6 227 5 275 18 356 97 112 109
142 350 65 522 -32 71 -101 128 -184 154 -59 18 -408 34 -422 20z m378 -73
c58 -29 101 -78 126 -141 18 -47 21 -76 21 -181 0 -107 -3 -134 -23 -185 -44
-113 -127 -165 -267 -165 l-63 0 0 351 0 352 83 -5 c55 -4 96 -12 123 -26z"/>
                <path d="M7610 2135 c0 -8 5 -15 10 -15 6 0 22 -11 35 -25 l25 -24 0 -319 c0
-308 -1 -320 -21 -346 -11 -14 -27 -26 -35 -26 -8 0 -14 -7 -14 -15 0 -13 35
-15 259 -15 143 0 262 3 265 8 2 4 6 54 7 112 l3 105 -29 0 c-26 0 -30 -5 -37
-38 -13 -65 -44 -114 -79 -126 -18 -6 -72 -11 -120 -11 l-89 0 0 334 c0 184 3
342 6 351 4 9 17 21 30 26 13 4 24 15 24 24 0 13 -19 15 -120 15 -100 0 -120
-2 -120 -15z"/>
                <path d="M8257 2143 c-12 -11 -7 -22 13 -28 50 -16 50 -14 50 -366 0 -316 -1
-330 -20 -349 -11 -11 -27 -20 -35 -20 -8 0 -15 -7 -15 -15 0 -13 37 -15 269
-15 l269 0 6 23 c3 12 6 57 6 100 l0 78 -27 -3 c-22 -2 -29 -11 -43 -52 -9
-27 -28 -59 -44 -72 -25 -22 -36 -24 -142 -24 l-114 0 0 170 0 170 68 0 c94 0
109 -6 129 -51 12 -29 23 -39 40 -39 23 0 23 2 23 115 l0 115 -24 0 c-19 0
-27 -8 -36 -35 -15 -47 -34 -55 -124 -55 l-76 0 0 156 0 156 121 -4 121 -3 29
-34 c15 -19 31 -47 34 -63 5 -23 12 -28 36 -28 l29 0 0 90 0 90 -268 0 c-148
0 -272 -3 -275 -7z"/>
                <path d="M8940 2135 c0 -8 5 -15 10 -15 6 0 22 -11 35 -25 l25 -24 0 -326 c0
-312 -1 -326 -20 -345 -11 -11 -27 -20 -35 -20 -8 0 -15 -7 -15 -15 0 -13 21
-15 130 -15 109 0 130 2 130 15 0 8 -7 15 -15 15 -9 0 -27 11 -40 25 -24 23
-25 28 -25 175 l0 150 64 0 c90 0 112 -11 127 -60 11 -35 16 -40 41 -40 l29 0
-3 123 c-3 122 -3 122 -27 122 -18 0 -27 -8 -34 -30 -18 -57 -33 -65 -119 -65
l-78 0 0 160 0 160 100 0 c125 0 149 -11 179 -80 17 -40 26 -50 46 -50 28 0
31 10 27 106 l-4 74 -264 0 c-228 0 -264 -2 -264 -15z"/>
                <path d="M10360 2136 c0 -9 11 -21 25 -26 14 -5 30 -21 35 -35 15 -39 13 -627
-2 -660 -6 -14 -22 -28 -35 -31 -13 -4 -23 -12 -23 -20 0 -11 25 -14 125 -14
104 0 125 2 125 15 0 8 -7 15 -15 15 -8 0 -24 9 -35 20 -18 18 -20 33 -20 161
l0 141 60 -4 c77 -5 90 -18 166 -163 32 -60 68 -127 81 -147 l23 -38 80 0 c64
0 80 3 80 15 0 8 -11 17 -25 21 -30 7 -57 43 -125 168 -32 57 -70 112 -92 131
l-38 32 57 34 c46 27 63 45 86 89 24 47 28 64 25 115 -5 85 -35 130 -107 163
-53 25 -67 26 -253 30 -179 4 -198 3 -198 -12z m366 -59 c57 -29 69 -52 72
-141 3 -72 1 -85 -20 -116 -34 -51 -79 -70 -165 -70 l-73 0 0 176 0 177 78 -6
c44 -2 92 -12 108 -20z"/>
                <path d="M11036 2113 c-10 -64 -7 -150 7 -161 22 -17 54 4 61 40 3 19 19 49
35 68 27 33 32 35 92 35 l64 0 3 -306 c1 -168 -1 -324 -6 -345 -6 -30 -14 -42
-39 -54 -18 -8 -33 -21 -33 -27 0 -10 33 -13 130 -13 104 0 130 3 130 14 0 8
-11 17 -25 20 -47 12 -50 30 -53 360 -2 170 -1 320 3 333 5 21 11 23 62 23 50
0 59 -3 87 -34 18 -18 38 -52 44 -75 11 -36 16 -41 43 -41 l30 0 -3 98 -3 97
-311 3 -311 2 -7 -37z"/>
                <path d="M2950 810 c0 -5 5 -10 11 -10 16 0 32 -49 84 -250 27 -102 52 -189
56 -194 4 -5 18 -6 31 -3 20 6 29 26 73 187 27 99 52 180 55 180 3 0 25 -82
50 -182 45 -180 55 -201 87 -179 5 3 38 92 73 196 67 202 85 245 100 245 6 0
10 5 10 10 0 6 -28 10 -65 10 -36 0 -65 -2 -65 -5 0 -3 9 -14 20 -25 15 -15
19 -28 14 -48 -13 -59 -88 -292 -93 -292 -3 0 -21 68 -40 152 -50 227 -48 220
-79 216 -26 -3 -29 -10 -79 -187 -29 -101 -54 -185 -56 -188 -7 -6 -77 283
-77 317 0 18 6 33 15 36 35 14 10 24 -55 24 -40 0 -70 -4 -70 -10z"/>
                <path d="M3590 810 c0 -5 5 -10 11 -10 16 0 32 -49 84 -250 27 -102 52 -189
56 -194 4 -5 18 -6 31 -3 20 6 29 26 73 187 27 99 52 180 55 180 3 0 25 -82
50 -182 45 -180 55 -201 87 -179 5 3 38 92 73 196 67 202 85 245 100 245 6 0
10 5 10 10 0 6 -28 10 -65 10 -36 0 -65 -2 -65 -5 0 -3 9 -14 20 -25 15 -15
19 -28 14 -48 -13 -59 -88 -292 -93 -292 -3 0 -24 82 -47 183 l-40 182 -30 0
-29 0 -52 -184 c-29 -101 -54 -185 -56 -188 -7 -6 -77 283 -77 317 0 18 6 33
15 36 35 14 10 24 -55 24 -40 0 -70 -4 -70 -10z"/>
                <path d="M4230 810 c0 -5 5 -10 11 -10 16 0 32 -49 84 -250 27 -102 52 -189
56 -194 4 -5 18 -6 31 -3 20 6 29 26 73 187 27 99 52 180 55 180 3 0 25 -81
49 -180 24 -99 48 -183 52 -186 30 -18 46 11 113 212 37 113 77 215 87 225 11
11 19 21 19 24 0 3 -29 5 -65 5 -68 0 -79 -7 -44 -28 25 -16 23 -24 -34 -210
-22 -73 -44 -129 -48 -125 -4 5 -25 87 -46 183 l-40 175 -29 0 -29 0 -52 -184
c-29 -101 -54 -185 -56 -188 -7 -6 -77 283 -77 317 0 18 6 33 15 36 35 14 10
24 -55 24 -40 0 -70 -4 -70 -10z"/>
                <path d="M5072 793 c-81 -52 -114 -185 -81 -317 25 -99 129 -151 224 -112 29
13 35 13 46 0 6 -8 18 -14 25 -14 11 0 14 19 14 83 0 58 5 89 15 103 23 30 19
34 -44 34 -64 0 -84 -12 -51 -30 29 -15 29 -111 0 -140 -38 -38 -113 -21 -146
33 -16 27 -19 51 -19 152 0 111 2 123 24 154 47 66 129 73 166 13 11 -17 28
-31 38 -32 14 0 17 9 17 44 0 52 -8 56 -115 56 -61 0 -77 -4 -113 -27z"/>
                <path d="M5400 810 c0 -5 6 -10 14 -10 23 0 26 -24 26 -220 0 -183 -1 -188
-22 -203 -21 -15 -12 -16 135 -16 l157 -1 0 65 c0 51 -3 65 -15 65 -8 0 -17
-12 -21 -27 -15 -63 -28 -73 -105 -73 l-70 0 3 196 c3 173 5 197 21 208 29 22
20 26 -53 26 -40 0 -70 -4 -70 -10z"/>
                <path d="M6101 798 c-95 -260 -147 -387 -169 -410 l-26 -28 75 0 74 0 -24 19
c-24 18 -24 20 -12 75 l12 56 84 0 84 0 12 -56 c12 -55 12 -57 -12 -75 l-24
-19 79 0 79 0 -20 23 c-13 13 -46 102 -85 230 -62 205 -63 207 -91 207 -19 0
-30 -7 -36 -22z m74 -210 l14 -48 -70 0 c-38 0 -69 3 -69 8 0 6 10 34 57 162
l17 45 18 -60 c10 -33 25 -81 33 -107z"/>
                <path d="M6380 812 c0 -4 9 -13 20 -20 19 -11 20 -23 20 -202 0 -182 -1 -190
-22 -210 l-22 -20 64 0 64 0 -22 20 c-21 20 -22 29 -22 193 0 172 0 172 19
142 10 -16 61 -101 112 -189 54 -91 102 -161 114 -166 20 -7 20 -2 25 207 4
189 7 216 23 227 28 21 20 26 -43 26 -33 0 -60 -4 -60 -10 0 -5 6 -10 14 -10
23 0 26 -24 26 -178 l0 -147 -102 172 -103 172 -52 1 c-29 0 -53 -3 -53 -8z"/>
                <path d="M6839 816 c-8 -8 3 -116 11 -116 5 0 19 19 32 43 21 38 27 42 66 45
l42 3 0 -191 0 -191 -26 -24 -27 -25 77 0 c44 0 76 4 76 10 0 6 -6 10 -14 10
-23 0 -26 24 -26 221 l0 189 31 0 c44 0 66 -15 79 -55 19 -58 40 -45 40 25 l0
60 -178 0 c-98 0 -181 -2 -183 -4z"/>
                <path d="M7270 814 c0 -4 8 -13 18 -20 15 -11 17 -33 17 -208 0 -183 -1 -196
-20 -210 -18 -14 -14 -15 55 -15 71 0 74 1 53 16 -23 15 -23 19 -23 215 0 191
1 200 20 205 43 11 17 23 -50 23 -38 0 -70 -3 -70 -6z"/>
                <path d="M7490 812 c0 -4 9 -13 20 -20 19 -11 20 -23 20 -206 0 -189 0 -194
-22 -209 -22 -15 -19 -16 51 -16 l75 -1 -22 20 c-20 18 -22 31 -22 111 l0 90
26 -3 c21 -2 41 -23 88 -91 53 -77 59 -90 48 -107 -12 -19 -9 -20 65 -20 72 1
76 2 53 15 -14 7 -43 40 -65 72 -22 32 -57 82 -78 111 -34 47 -37 56 -25 70
76 91 153 172 164 172 8 0 14 5 14 10 0 6 -32 10 -75 10 -70 0 -95 -10 -60
-24 24 -9 18 -35 -21 -87 -43 -59 -89 -99 -115 -99 -17 0 -19 8 -19 85 0 74 3
86 20 97 34 22 23 28 -50 28 -38 0 -70 -3 -70 -8z"/>
                <path d="M8070 814 c0 -5 9 -15 20 -22 19 -11 20 -23 20 -206 0 -189 0 -194
-22 -209 -22 -15 -16 -16 82 -16 120 -1 167 9 209 45 68 57 90 225 41 314 -41
73 -89 93 -232 98 -65 3 -118 0 -118 -4z m226 -44 c53 -26 77 -72 82 -160 5
-86 -12 -146 -53 -187 -30 -30 -38 -33 -94 -33 l-61 0 0 200 0 200 42 0 c23 0
61 -9 84 -20z"/>
                <path d="M8530 812 c0 -4 9 -13 20 -20 19 -11 20 -23 20 -206 0 -189 0 -194
-22 -209 -22 -15 -19 -16 51 -16 l75 -1 -22 20 c-20 18 -22 31 -22 111 l0 90
26 -3 c20 -2 40 -23 87 -91 53 -77 60 -91 49 -108 -12 -18 -9 -19 65 -18 65 0
74 2 55 12 -20 9 -182 227 -182 243 0 7 77 92 142 157 l48 47 -75 0 c-70 0
-95 -10 -60 -24 25 -9 17 -36 -27 -93 -49 -63 -83 -93 -109 -93 -17 0 -19 9
-19 85 0 74 3 86 20 97 34 22 23 28 -50 28 -38 0 -70 -3 -70 -8z"/>
                <path d="M5740 595 c0 -25 1 -25 80 -25 79 0 80 0 80 25 0 25 -1 25 -80 25
-79 0 -80 0 -80 -25z"/>
                <path d="M4835 432 c-3 -3 -5 -20 -5 -39 0 -31 2 -33 35 -33 33 0 35 2 35 34
0 30 -3 34 -30 38 -17 3 -32 2 -35 0z"/>
                <path d="M7948 432 c-24 -3 -28 -8 -28 -38 0 -32 2 -34 35 -34 33 0 35 2 35
34 0 39 -4 43 -42 38z"/>
            </g>
        </svg>

    )
}

export default GroendlundLogo;