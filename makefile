all: compile

clean:
		rm -rf build/

compile:
		tsc --outFile build/game.js --lib es2017,dom src/main.ts
		cp public/* build
		cd build && node ../../games-builder/build-game.js game.html

.PHONY: clean compile
.SILENT: