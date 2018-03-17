const cameraId = window.location.pathname.split("/")[2];

document.querySelector('.element-start').innerHTML = `Stół ${cameraId}`;

class Opponent {
	constructor(opponent) {
		this.opponent = opponent;
		this.$name = document.querySelector(`.opponent.${this.opponent} .name`);
		this.$score = document.querySelector('.score').querySelector(`.${this.opponent}`);
	}

	update(name, score) {
		this.$name.innerHTML = name;
		this.$score.innerHTML = score;
	}	
}

const $scoreBox = document.querySelector('#scoreBox');
const $stage = document.querySelector('.element-end');
const $leftLogos = document.querySelector('.logos-left');
const $opponent1 = new Opponent('opponent-1');
const $opponent2 = new Opponent('opponent-2');

function update(data) {
	const { opponent1, opponent2 } = data;

	$opponent1.update(opponent1.name, opponent1.score, opponent1.showScores);
	$opponent2.update(opponent2.name, opponent2.score, opponent2.showScores);

	$scoreBox.classList.toggle('visibility--hidden', !data.showScores);
	$leftLogos.classList.toggle('with-scores', data.showScores);
	$stage.innerHTML = data.stage || '';
}

socket.on('cameras', newData => {
	if (!newData) {
		return;
	}

	for(const camera in newData) {
		if (newData.hasOwnProperty(camera) && camera ===  `camera-${cameraId}`) {
			update(newData[camera]);
		}
	}
});

socket.on('update', newData => {
	if (!newData || !newData.camera) {
		return;
	}

	if (newData.camera === `camera-${cameraId}`) {
		update(newData);
	}
});