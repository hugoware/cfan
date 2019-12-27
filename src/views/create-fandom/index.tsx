import * as React from "react";

export class CreateFandom extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Header</h1>
          <p>The battle of the Fandoms</p>
        </div>

        <div className="content">
          <p>Username:</p>
          <input type="text" />
          <p>Avatar:</p>
          <input type="file" name="pic" accept="image/*" />
          <p>Favorite Fandom:</p>
          <input type="text" placeholder="Search.." name="search" />
          <button className="createNew">Create your own</button>
          <div className="Container">
            <input type="submit" />
          </div>
        </div>
      </div>
    );
  }
}

//username avatar search menu pluss button
