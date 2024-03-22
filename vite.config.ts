import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Muchi-ui',
      fileName: 'muchi-ui'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import typescript2 from 'rollup-plugin-typescript2'
// import { resolve } from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     typescript2({
//       check: false,
//       include: ['src/components/**/*.vue'],
//       tsconfigOverride: {
//         compilerOptions: {
//           outDir: 'dist',
//           sourceMap: true,
//           declaration: true,
//           declarationMap: true
//         }
//       },
//       exclude: ['vite.config.ts']
//     })
//   ],
//   build: {
//     cssCodeSplit: false,
//     lib: {
//       entry: './src/ViewerPlugin.ts',
//       formats: ['es', 'cjs'],
//       name: 'ViewerPlugin',
//       fileName: (format) => `muchi-ui.${format}.js`
//     },
//     rollupOptions: {
//       external: ['vue'],
//       output: {
//         exports: 'named',
//         globals: {
//           vue: 'Vue'
//         }
//       }
//     }
//   },
//   // server: {
//   //   watch: {
//   //     usePolling: true
//   //   }
//   // },
//   // resolve: {
//   //   alias: {
//   //     '@': fileURLToPath(new URL('./src', import.meta.url))
//   //   }
//   // }
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src')
//     }
//   }
// })
