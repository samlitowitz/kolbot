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
		Missing: function () {
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
		ShouldUpgrade: function () {
			if (this.Missing()) {
				return true;
			}
			const allRes = this.GetAllRes();
			return allRes !== null && allRes < 35;
		},
		MissingOrShouldUpgrade: function () {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			if (!this.MissingOrShouldUpgrade()) {
				return false;
			}
			const allRes = this.GetAllRes();
			if (allRes === null) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == serpentskinarmor && [quality] == unique # [coldresist] == {1} && [fireresist] == {1} && [lightresist] == {1}".format(allRes)
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
				if (item.itemType !== sdk.items.type.Armor) {
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
