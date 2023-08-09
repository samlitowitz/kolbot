js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		BodyLocs: [
			sdk.body.Belt
		],
		Name: 'Tal Rasha\'s Fine Spun Cloth',
		farmScripts: function () {
			return [
				'Mephisto',
				'Andariel'
			];
		},
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				return true;
			}
			return false;
		},
		shouldUpgrade: function () {
			if (this.missing()) {
				return true;
			}
			const mf = this.getMF();
			return mf !== null && mf < 15;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			if (!this.missingOrShouldUpgrade()) {
				return false;
			}
			const mf = this.getMF();
			if (mf === null) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == meshbelt && [quality] == set # [itemfinditem] > {1}".format(mf)
			);
			return true;
		},
		getMF: function () {
			let i, maxMF = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (maxMF === null) {
					maxMF = item.getStatEx(sdk.stats.Find);
					continue;
				}
				if (item.getStatEx(sdk.stats.Find) < maxMF) {
					continue;
				}
				maxMF = item.getStatEx(sdk.stats.Find);
			}
			return maxMF;
		}
	}
})(module);
