const PrioritizedPickIt = {
	rollAndKeep: function(prioritizedList) {
		let i, opt,
			optName,
			fnMissing,
			fnShouldUpgrade
		;
		for (i = 0; i < prioritizedList.length; i++) {
			opt = prioritizedList[i];
			if (opt === null) {
				continue;
			}
			if (typeof opt !== 'object') {
				continue;
			}

			optName = '<UNKNOWN>';
			if (Object.prototype.hasOwnProperty(opt, 'Name')) {
				optName = opt.Name;
			}

			if (!Object.prototype.hasOwnProperty(opt, 'rollAndKeep')) {
				this.print(optName, 'SKIP: `rollAndKeep` not found');
				continue;
			}

			fnMissing = this.fnTrue;
			if (Object.prototype.hasOwnProperty(opt, 'missing')) {
				this.print(optName, 'INFO: `missing` not found, default true');
				fnMissing = opt.missing;
			}
			fnShouldUpgrade = this.fnTrue;
			if (Object.prototype.hasOwnProperty(opt, 'shouldUpgrade')) {
				this.print(optName, 'INFO: `shouldUpgrade` not found, default true');
				fnShouldUpgrade = opt.shouldUpgrade;
			}

			if (fnMissing()) {
				this.print(optName, 'MISSING: roll and keep');
				opt.rollAndKeep();
				continue;
			}
			if (fnShouldUpgrade()) {
				this.print(optName, 'UPGRADE: roll and keep');
				opt.rollAndKeep();
				continue;
			}
			this.print(optName, 'STOP');
			break;
		}
	},
	print: function(name, message) {
		console.info("[" + name + "]: " + message);
	},
	fnTrue: function() {
		return true;
	}
};
