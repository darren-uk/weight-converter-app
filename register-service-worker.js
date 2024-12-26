if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register(
				"https://darren-uk.github.io/weight-converter-app/service-worker.js"
			)
			.then((registration) => {
				console.log(
					"Service worker registered with scope:",
					registration.scope
				);
			})
			.catch((error) => {
				console.log("Service worker registration failed:", error);
			});
	});
}
