import React from 'react';
import './login.css'


export function Login() {
  return (
    <main>
      <div>
        <form method="get" action="draw.html">
                <div>
                    <span>Username: </span>
                    <input type="text" placeholder="username here" required />
                </div>
                <br />
                <button className="btn btn-outline-primary">Login &rarr;</button>
                <button className="btn btn-outline-success">Register &rarr;</button>
            </form>
            <br />
      </div>
    </main>
  );
}

