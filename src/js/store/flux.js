const getState = ({ createContext, getStore, getActions, setStore }) => {
	return {
		store: {
				contacts:[]
		},
		actions: {

			getContactsList: async () => {
				try {
					let resp = await fetch("https://playground.4geeks.com/contact/agendas/kale/contacts", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						}
					});
			
					if (resp.status === 404) {
						console.log("Agenda no encontrada, creando nueva agenda...");
						let createResp = await fetch("https://playground.4geeks.com/contact/agendas/kale", {        
							method: "POST", 
							headers: {
								"Content-Type": "application/json",
							}
						});
						if (!createResp.ok) {
							console.error("Error al crear la agenda:", createResp.statusText);
							return; 
						}
						console.log("Agenda creada exitosamente.");
						resp = await fetch("https://playground.4geeks.com/contact/agendas/kale/contacts", {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							}
						});
					}
			
					if (resp.ok) {
						let data = await resp.json();
						setStore({ contacts: data.contacts || [] });
					} else {
						console.error("Error al obtener la lista de contactos:", resp.statusText);
						setStore({ contacts: [] });
					}
				} catch (error) {
					console.error("Error en getContactsList:", error);
					setStore({ contacts: [] });
				}
			},
			
			
			createNewContact: async ({ fullName, phone, email, address }) => {
				let resp = await fetch("https://playground.4geeks.com/contact/agendas/kale/contacts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: fullName,
						phone: phone,
						email: email,
						address: address
					})
				});
				
				if (resp.status === 422) {
					console.log("No se puede crear el contacto");
				}
				
				if (resp.ok) {
					let data = await resp.json();
					console.log({ data });
					setStore({ contacts: data.contacts });
				}
			},
			
			updateContact: async ( id, fullName, phone, email, address ) => {
				let resp = await fetch(`https://playground.4geeks.com/contact/agendas/kale/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ 
						name: fullName,
						phone: phone,
						email: email,
						address: address
					})
				});
				if (resp.status === 422) {
					console.log("No se puede crear el contacto");
				}
				
				if (resp.ok) {
					let data = await resp.json();
					console.log({ data });
					setStore({ contacts: data.contacts }); 
				}
			},
			deleteContact: async (id) => {
				let resp = await fetch(`https://playground.4geeks.com/contact/agendas/kale/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					}
				});
				if (resp.status === 404) {
					console.log("No se puede eliminar el contacto")
				}
				if (resp.status === 200) {
					let data = await resp.json();
					console.log({ data });
					setStore({contacts:data});
				}
			},
		},
	};
};

export default getState;
