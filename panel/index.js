var fs = require('fs');

const PACKAGE_NAME = 'ccc-load-points';

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  // style: `
  //   :host { margin: 5px; }
  //   h2 { color: #f90; }
  // `,

  // html template for panel
  // template: `
  //   <h2>ccc-load-points</h2>
  //   <hr />
  //   <div>State: <span id="label">--</span></div>
  //   <hr />
  //   <ui-button id="btn">Send To Main</ui-button>
  //   <hr />
  //   <ui-button id="dump">dump points</ui-button>
  // `,
  template: fs.readFileSync(Editor.url(`packages://${PACKAGE_NAME}/panel/index.html`), 'utf8'),

  style: fs.readFileSync(Editor.url(`packages://${PACKAGE_NAME}/panel/index.css`), 'utf8'),

  // element and variable binding
  $: {
    // btn: '#btn',
    // label: '#label',
    // dump: '#dump',
    dumpOrigBtn: '#btn1',
    dumpOffsetBtn: '#btn2',

    table: '#table',
    row1: '#row1',
    index1: '#index1',
    x1: '#x1',
    y1: '#y1',

    index2: '#index2',
    x2: '#x2',
    y2: '#y2',
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    // this.$btn.addEventListener('confirm', () => {
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

    // });

    this.$dumpOffsetBtn.addEventListener('confirm', () => {
      let no = this.$table;
      
      Editor.Scene.callSceneScript('ccc-load-points', 'getfirstchildren-points', '', function (err, points) {
        if (err) {
          Editor.log(err);
        }

        let no1 = this.$table.getElementById("index1");

        // console.log(`get-canvas-children callback : length - ${length}`);
        if (this.$index1.value && this.$index1.value.length > 0) {
          let chs = this.$.index1.value;
          chs = chs.replace(" ", "");
          let ls = chs.split(",");
          let x = this.$x1.value ? Number(this.$x1.value) : 0;
          let y = this.$y1.value ? Number(this.$y1.value) : 0;
          for (let i = 0; i < ls.length; i++) {
            let  name = ls[i];
            points[name].x = points[name].x + x;
            points[name].y = points[name].y + y;
          }
        }

        if (this.$index2.value && this.$index2.value.length > 0) {
          let chs = this.$.index2.value;
          chs = chs.replace(" ", "");
          let ls = chs.split(",");
          let x = this.$x2.value ? Number(this.$x2.value) : 0;
          let y = this.$y2.value ? Number(this.$y2.value) : 0;
          for (let i = 0; i < ls.length; i++) {
            let  name = ls[i];
            points[name].x = points[name].x + x;
            points[name].y = points[name].y + y;
          }
        }

        Editor.log(JSON.stringify(points));
      });
    });

    this.$dumpOrigBtn.addEventListener('confirm', () => {
      Editor.Scene.callSceneScript('ccc-load-points', 'getfirstchildren-points', '', function (err, points) {
        if (err) {
          Editor.log(err);
        }
        // console.log(`get-canvas-children callback : length - ${length}`);

        Editor.log(JSON.stringify(points));
      });
    });

    // this.$dump.addEventListener('confirm', () => {
    //   Editor.Scene.callSceneScript('ccc-load-points', 'getfirstchildren-points', '', function (err, points) {
    //     if (err) {
    //       Editor.log(err);
    //     }
    //     // console.log(`get-canvas-children callback : length - ${length}`);

    //     Editor.log(String(points));
    //   });
    // });
  },

  // register your ipc messages here
  messages: {
    'ccc-load-points:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});