class Opponent {
	constructor($opponent) {
		this.$opponent = $opponent;
		this.$name = this.$opponent.querySelector('.name input');
		this.$score = this.$opponent.querySelector('.score input');
	}

	value() {
		return {
			name: this.$name.value,
			score: this.$score.value
		};
	}

	update(opponent) {
		this.$name.value = opponent.name;
		this.$score.value = opponent.score;
	}	
}

class Camera {
	constructor(name) {
		this.name = name;
		this.$camera = document.querySelector(`.${this.name}`);
		this.opponent1 = new Opponent(this.$camera.querySelector('.opponent-1'));
		this.opponent2 = new Opponent(this.$camera.querySelector('.opponent-2'));
		this.$checkbox = this.$camera.querySelector('.checkbox');
		this.$switch = this.$camera.querySelector('.switch-opponents');
		this.$stage = this.$camera.querySelector('.stage input');
		this.$save = this.$camera.querySelector('.save');

		this.$save.addEventListener('click', () => this._save());
		this.$switch.addEventListener('click', () => this._switchOpponents());

		socket.on('cameras', data => this._init(data));
	}

	_save() {
		const result = {
			camera: this.name,
			opponent1: this.opponent1.value(),
			opponent2: this.opponent2.value(),
			showScores: this.$checkbox.checked,
			stage: this.$stage.value
		};

		socket.emit('new-data', result);
	}

	_switchOpponents() {
		const opponent1 = this.opponent1.value();

		this.opponent1.update(this.opponent2.value());
		this.opponent2.update(opponent1);
	}

	_init(data) {
		for(const camera in data) {
			if (data.hasOwnProperty(camera) && camera === this.name) {
				this.opponent1.update(data[camera].opponent1);
				this.opponent2.update(data[camera].opponent2);

				if (data[camera].showScores) {
					this.$checkbox.checked = true;
				} else {
					this.$checkbox.checked = false;		
				}
			}
		}
	}
}

const camera1 = new Camera('camera-1');
const camera2 = new Camera('camera-2');
