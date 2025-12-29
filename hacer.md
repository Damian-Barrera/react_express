-Cuando se recarga la pagina, se pierden los datos del usuario. Hay que ver que se pueda usar los datos que vienen en la session.
**** Se soluciono validando los datos de usuario ** usuario && <p>{usuario.email}</p> Siempre hay que validar los datos cuando se use context + fetch. ya que se renderiza antes de que lleguen los datos del backend. 


--Agregar boton para cerrar la sesion y que la destruya. Pero tambien deberia haber alguna validacion que verifique que haya esa sesion y si no existe que redirija al login--
**Hecho **