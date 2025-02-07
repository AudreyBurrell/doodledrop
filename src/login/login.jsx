import React from 'react';
import './login.css'

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        <form method="get" action="draw.html">
                <div>
                    <span>Username: </span>
                    <input type="text" placeholder="username here" required />
                </div>
                <br />
                <button class="btn btn-outline-primary">Login &rarr;</button>
                <button class="btn btn-outline-success">Register &rarr;</button>
            </form>
            <br />
      </div>
    </main>
  );
}