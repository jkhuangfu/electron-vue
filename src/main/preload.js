const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.version.node,
  chrome: () => process.version.chrome,
  foo: 'bar',
  net: () => ipcRenderer.invoke('net'),
  ping: () => ipcRenderer.invoke('ping', [1, 2, 3]),
  getData: () => ipcRenderer.invoke('get-data-test')
})

// contextBridge.exposeInMainWorld('api', {
//   bool: true
// })