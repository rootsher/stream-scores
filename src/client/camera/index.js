const cameraId = window.location.pathname.split("/")[2];

class Opponent {
	constructor($opponent) {
		this.$opponent = $opponent;
		this.$name = this.$opponent.querySelector('.name');
		this.$score = this.$opponent.querySelector('.score');
	}

	update(name, score) {
		this.$name.innerHTML = name;
		this.$score.innerHTML = score;
	}	
}

const $opponent1 = new Opponent(document.querySelector('.opponent-1'));
const $opponent2 = new Opponent(document.querySelector('.opponent-2'));

function update(data) {
	const { opponent1, opponent2 } = data;

	$opponent1.update(opponent1.name, opponent1.score);
	$opponent2.update(opponent2.name, opponent2.score);
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