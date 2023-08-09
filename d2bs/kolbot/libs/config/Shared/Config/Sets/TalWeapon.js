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
			sdk.body.LeftArm,
			sdk.body.RightArm
		],
		Name: 'Tal Rasha\'s Lidless Eye',
		FarmScripts: function () {
			return [
				'Mephisto',
				'Andariel'
			];
		},
		Missing: function () {
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
		ShouldUpgrade: function () {
			if (this.Missing()) {
				return true;
			}
			return false;
		},
		MissingOrShouldUpgrade: function () {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			if (!this.MissingOrShouldUpgrade()) {
				return false;
			}
			const coldMastery = this.GetMaxColdMastery(),
				lightningMastery = this.GetMaxLightningMastery()
			;
			if (coldMastery === null) {
				return false;
			}
			if (lightningMastery === null) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == swirlingcrystal && [quality] == set # [skillcoldmastery] > {1} && [skilllightningmastery] > {2}".format(coldMastery, lightningMastery)
			);
			return true;
		},
		GetMaxColdMastery: function () {
			const [id, subid] = sdk.stats.SkillColdMastery;
			let i, maxColdMastery = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (item.itemType !== sdk.items.type.Weapon) {
					continue;
				}
				if (maxColdMastery === null) {
					maxColdMastery = item.getStatEx(id, subid);
					continue;
				}
				if (item.getStatEx(id, subid) < maxColdMastery) {
					continue;
				}
				maxColdMastery = item.getStatEx(id, subid);
			}
			return maxColdMastery;
		},
		GetMaxLightningMastery: function () {
			const [id, subid] = sdk.stats.SkillLightningMastery;
			let i, maxLightningMastery = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (item.itemType !== sdk.items.type.Weapon) {
					continue;
				}
				if (maxLightningMastery === null) {
					maxLightningMastery = item.getStatEx(id, subid);
					continue;
				}
				if (item.getStatEx(id, subid) < maxLightningMastery) {
					continue;
				}
				maxLightningMastery = item.getStatEx(id, subid);
			}
			return maxLightningMastery;
		}
	}
})(module);
