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
			sdk.body.Armor
		],
		Name: 'Vipermagi',
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasUniqueEquippedAt(me, loc, 'Skin of the Vipermagi')) {
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
			const allRes = this.GetAllRes();
			return allRes !== null && allRes < 35;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			if (!this.missingOrShouldUpgrade()) {
				return false;
			}
			const allRes = this.GetAllRes();
			if (allRes === null) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == serpentskinarmor && [quality] == unique # [coldresist] > {1} && [fireresist] > {1} && [lightresist] > {1}".format(allRes)
			);
			return true;
		},
		GetAllRes: function() {
			let i, maxAllRes = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasUniqueEquippedAt(me, loc, 'Skin of the Vipermagi')) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (maxAllRes === null) {
					maxAllRes = item.getStatEx(sdk.stats.AllRes);
					continue;
				}
				if (item.getStatEx(sdk.stats.AllRes) < maxAllRes) {
					continue;
				}
				maxAllRes = item.getStatEx(sdk.stats.AllRes);
			}
			return maxAllRes;
		}
	}
})(module);
