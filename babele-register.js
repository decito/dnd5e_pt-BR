Hooks.once('init', () => { 
	if(typeof Babele !== 'undefined') { 
		Babele.get().register({
			module: 'dnd5e2024br',
			lang: 'pt-BR',
			dir: 'compendium'
		}); 
	}
});
