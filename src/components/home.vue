<template>
	<div class="home">
		<section class="home__wrap">
			<header class="home__head">
				<h1 class="home__title">VSMP TAB</h1>
				<h2 class="home__subtitle">
					a movie played very slooooooooooooooowly
					<br />in your browser tab
				</h2>
			</header>

			<main class="home__content">
				<div class="home__intro">
					<div class="home__excerpt">
						Based on
						<a
							href="https://medium.com/s/story/very-slow-movie-player-499f76c48b62"
							target="_blank"
						>Bryan Boyer’s idea</a>, get a new frame from a movie
						each hour when you open a new tab in your browser. It is
						safe for work.
					</div>

					<div class="home__cta">
						<div>
							<router-link :to="{ name: 'Watch' }" class="home__cta__btn">watch movie</router-link>
							<span class="home__cta__txt">and add it as start page</span>
						</div>
					</div>
				</div>

				<div class="home__demo">
					<Demo></Demo>
				</div>
			</main>
		</section>
	</div>
</template>

<script>
import Demo from "./block.demo";

export default {
	components: { Demo }
};
</script>

<style lang="scss">
@import "../css/_variables";
@import "../css/_fonts";
@import "../css/page.home";
</style>
