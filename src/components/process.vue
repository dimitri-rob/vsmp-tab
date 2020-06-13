<template>
	<div>
		test
	</div>
</template>

<script>
import ffmpeg from 'easy-ffmpeg';
import pathToFfmpeg from 'ffmpeg-static';
import extractFrames from 'ffmpeg-extract-frames';

export default {
	mounted() {
		extractFrames({
			input: '/media/1.mp4',
			output: '/media/frames/frame-%d.png',
			offsets: [1000, 2000, 10000],
		});
	},
};
</script>
