<div className="page flex items-center justify-center">

        <div className="cover">

          <img id="divLogo" src="/src/image/LOGO_NEGRO.png" />

          <input className=" imUser boder-2 border-[#191279]" type="text" id="user" name="_pcUsuario" onChange={this.handlechange} />
          <input type="password" id="password" name="_clave" onChange={this.handlechange} />



          <div className="login-btn" onClick={() => this.inicarSesion()}>
            Login

          </div>

          <div>
            <h3 id="Mensaje"></h3>
            <p id="DatosPersonales"></p>

          </div>
        </div>

      </div>