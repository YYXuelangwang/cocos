'use strict';

module.exports = {
    'getchildren': function (event) {
        console.log(event);
        var canvas = cc.find('mobile_V2');
        Editor.log('children length : ' + canvas.children.length);

        if (event.reply) {
            event.reply(null, canvas.children.length);
        }
    },

    'getfirstchildren-points':function(event) {
      Editor.Ipc.sendToPanel('scene', 'scene:query-hierarchy', (error, sceneID, hierarchy) => {
        if (error)
            return Editor.error(error);

        var parent = hierarchy[1];
        parent = cc.find(parent.name);
        var childs = parent.children;
        var ret = {};
        for (let i = 0; i < childs.length; i++) {
            var ele = childs[i];
            // let pt:cc.Vec2 = element.getPosition();
            ret[ele.name] = {"x":ele.getPosition().x, "y":ele.getPosition().y}
        }

        if(event.reply) {
            event.reply(null, ret)
        }

      });
    }
};