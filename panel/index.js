// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>ccc-load-points</h2>
    <hr />
    <div>State: <span id="label">--</span></div>
    <hr />
    <ui-button id="btn">Send To Main</ui-button>
    <hr />
    <ui-button id="dump">dump points</ui-button>
  `,

  // element and variable binding
  $: {
    btn: '#btn',
    label: '#label',
    dump: '#dump',
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    this.$btn.addEventListener('confirm', () => {
      // Editor.Ipc.sendToMain('ccc-load-points:clicked');
      // Editor.Ipc.sendToMain('ccc-load-points:say-hello', 'Hello, this is a test message');

      // Editor.Ipc.sendToPanel('scene', 'scene:query-hierarchy', (error, sceneID, hierarchy) => {
      //   if (error)
      //       return Editor.error(error);
      //   // hierarchy
      //   Editor.log(hierarchy);

      //   Editor.Ipc.sendToPanel('scene', 'scene:query-node-info', hierarchy[1].id, 'cc.Node', (error, info) => {
      //     if (error)
      //         return Editor.error(error);
      //     // info
      //     Editor.log(info);
      //   });
      // });

      // Editor.Scene.callSceneScript('ccc-load-points', 'getchildren', '', function (err, length) {
      //   if (err) {
      //     Editor.log(err);
      //   }
      //   console.log(`get-canvas-children callback : length - ${length}`);
      // });

    });

    this.$dump.addEventListener('confirm', () => {
      Editor.Scene.callSceneScript('ccc-load-points', 'getfirstchildren-points', '', function (err, points) {
        if (err) {
          Editor.log(err);
        }
        // console.log(`get-canvas-children callback : length - ${length}`);

        Editor.log(String(points));
      });
    });
  },

  // register your ipc messages here
  messages: {
    'ccc-load-points:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});