import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Cafeteria</h1>
        <p>Delicious meals. Simple ordering.</p>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>New User</h2>
          <p className="subtitle">Create Account</p>
          <form className="login-form">
            <label>
              Email
              <input type="email" placeholder="student@example.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
