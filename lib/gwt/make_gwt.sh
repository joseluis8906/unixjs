#!/bin/sh

echo "making gwt.js"
#root
cat conf.js > gwt.js


#core
cat core/conf.js >> gwt.js
cat core/upload.js >> gwt.js
cat core/session.js >> gwt.js
cat core/sql.js >> gwt.js

#gui
cat gui/conf.js >> gwt.js
cat gui/frame.js >> gwt.js
cat gui/window.js >> gwt.js
cat gui/dialog.js >> gwt.js
cat gui/button.js >> gwt.js
cat gui/entry.js >> gwt.js
cat gui/file.js >> gwt.js
cat gui/text.js >> gwt.js
cat gui/hbox.js >> gwt.js
cat gui/image.js >> gwt.js
cat gui/croppie.js >> gwt.js
cat gui/avatar.js >> gwt.js
cat gui/menu_item.js >> gwt.js
cat gui/menu.js >> gwt.js
cat gui/select_box_item.js >> gwt.js
cat gui/select_box_dialog.js >> gwt.js
cat gui/select_box.js >> gwt.js
cat gui/static_text.js >> gwt.js
cat gui/vbox.js >> gwt.js
cat gui/slider.js >> gwt.js
cat gui/clock.js >> gwt.js
cat gui/button_on_off.js >> gwt.js
cat gui/icon_control.js >> gwt.js
cat gui/icon_desktop.js >> gwt.js
cat gui/icon_entry.js >> gwt.js
cat gui/icon_select_box.js >> gwt.js
cat gui/date.js >> gwt.js
cat gui/time.js >> gwt.js
cat gui/knob_three_levels.js >> gwt.js



#graphic
cat graphic/conf.js >> gwt.js
cat graphic/svg/conf.js >> gwt.js
cat graphic/svg/graphic.js >> gwt.js
cat graphic/svg/canvas.js >> gwt.js
cat graphic/svg/rect.js >> gwt.js
cat graphic/svg/circle.js >> gwt.js
cat graphic/svg/ellipse.js >> gwt.js
cat graphic/svg/line.js >> gwt.js
cat graphic/svg/polygon.js >> gwt.js
cat graphic/svg/polyline.js >> gwt.js
cat graphic/svg/path.js >> gwt.js
cat graphic/svg/arc.js >> gwt.js



#compile and mimic
#yuicompressor.sh gwt.js

#mv gwt.min.js ../

echo "gwt.js maked"
