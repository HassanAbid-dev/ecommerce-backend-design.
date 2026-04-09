import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ data: { name, email, password } }) => {
    const { register } = useContext(AuthContext);
    register();
    try {
    } catch (error) {
      console.log("Error inn registering user.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required." })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <label>Name</label>
        <br />
        <input
          type="text"
          placeholder="Name"
          {...register("username", { required: "User name is required." })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required." })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
