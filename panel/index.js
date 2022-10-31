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
      let self = this;
      let getRowData = function(i) {
        let index = i == 1 ? self.$index1 : self.$index2;
        let xt = i == 1? self.$x1 : self.$x2;
        let yt = i == 1? self.$y1 : self.$y2;
        if (index.value && index.value.length > 0) {
          let chs = index.value;
          chs = chs.replace(" ", "");
          let ls = chs.split(",");
          let x = xt.value ? Number(xt.value) : 0;
          let y = yt.value ? Number(yt.value) : 0;
          return {"chs":chs, "x":x, "y":y}
        }
        return {"chs":"", "x":0, "y":0}
      }

      let write_data = [getRowData(1), getRowData(2)];

      Editor.Scene.callSceneScript('ccc-load-points', 'getfirstchildren-points', '', function (err, points) {
        if (err) {
          Editor.log(err);
        }

        for (let i = 0; i < write_data.length; i++) {
          let cf = write_data[i];
          if (cf.chs.length > 0) {
            let ls = cf.chs.split(",");
            let x = cf.x;
            let y = cf.y;
            for (let i = 0; i < ls.length; i++) {
              let  name = ls[i];
              points[name].x = points[name].x + x;
              points[name].y = points[name].y + y;
            }
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