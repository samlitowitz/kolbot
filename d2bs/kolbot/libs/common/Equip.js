const Equip = {
	isMe: function (unit) {
		if (!unit) {
			return false;
		}
		if (unit.type !== sdk.unittype.Player) {
			return false;
		}
		return unit.gid === me.gid;
	},

	isMyMerc: function (unit) {
		if (!unit) {
			return false;
		}
		if (unit.type !== sdk.unittype.NPC) {
			return false;
		}
		const merc = me.getMerc();
		if (!merc) {
			return false;
		}
		return unit.gid === merc.gid;
	},

	canEquip: function (unit, item) {
		const isMe = this.isMe(unit);
		const isMyMerc = this.isMyMerc(unit);
		if (!isMe && !isMyMerc) {
			return false;
		}

		if (!item) {
			return false;
		}
		if (item.type !== sdk.unittype.Item) {
			return false;
		}
		if (!item.Identified) {
			return false;
		}
		if (item.getStat(sdk.stats.LevelReq) > unit.getStat(sdk.stats.LevelReq)) {
			return false;
		}
		if (item.dexreq > unit.getStat(sdk.stats.Dexterity)) {
			return false;
		}
		if (item.strreq > unit.getStat(sdk.stats.Strength)) {
			return false;
		}

		switch (item.itemType) {
			case sdk.items.type.AmazonItem:
			case sdk.items.type.BarbarianItem:
			case sdk.items.type.NecromancerItem:
			case sdk.items.type.PaladinItem:
			case sdk.items.type.SorceressItem:
			case sdk.items.type.AssassinItem:
			case sdk.items.type.DruidItem:
				if (!isMe) {
					return false;
				}
				break;
			default:
				return true;
		}

		switch (item.itemType) {
			case sdk.items.type.AmazonItem:
				if (me.amazon) {
					return true;
				}
				break;

			case sdk.items.type.BarbarianItem:
				if (me.barbarian) {
					return true;
				}
				break;

			case sdk.items.type.NecromancerItem:
				if (me.necromancer) {
					return true;
				}
				break;

			case sdk.items.type.PaladinItem:
				if (me.paladin) {
					return true;
				}
				break;

			case sdk.items.type.SorceressItem:
				if (me.sorceress) {
					return true;
				}
				break;

			case sdk.items.type.AssassinItem:
				if (me.assassin) {
					return true;
				}
				break;

			case sdk.items.type.DruidItem:
				if (me.druid) {
					return true;
				}
				break;
			default:
		}
		return false;
	},

	equippedAt: function (unit, bodyLoc) {
		const isMe = this.isMe(unit);
		const isMyMerc = this.isMyMerc(unit);
		if (!isMe && !isMyMerc) {
			return false;
		}
		let item = unit.getItem();
		if (!item) {
			return null;
		}
		do {
			if (item.unittype !== sdk.unittype.Item) {
				continue;
			}
			if (item.bodyLocation !== bodyLoc) {
				continue;
			}
			return copyUnit(item);
		} while (item.getNext());
		return null;
	},

	hasRunewordEquippedAt: function (unit, bodyLoc, runewordName) {
		let item = this.equippedAt(unit, bodyLoc);
		if (!item) {
			return false;
		}
		if (!item.getFlag(sdk.items.flags.Runeword)) {
			return false;
		}
		return item.runeword === runewordName;
	},

	hasSetEquippedAt: function (unit, bodyLoc, setItemName) {
		let item = this.equippedAt(unit, bodyLoc);
		if (!item) {
			return false;
		}
		if (!item.quality !== sdk.items.quality.Set) {
			return false;
		}
		return item.name === setItemName;
	},

	hasUniqueEquippedAt: function (unit, bodyLoc, uniqueItemName) {
		let item = this.equippedAt(unit, bodyLoc);
		if (!item) {
			return false;
		}
		if (!item.quality !== sdk.items.quality.Unique) {
			return false;
		}
		return item.name === uniqueItemName;
	}
};
