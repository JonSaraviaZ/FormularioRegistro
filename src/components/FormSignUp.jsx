import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from "@mui/material/TextField";
import { useState } from "react";

function FormSignUp({handleSubmit}) {
    const [name, setName] = useState ("")
    const [lastName, setLastName] = useState ("")
    const [email, setEmail] = useState ("")
    const [prom, setProm] = useState (true)
    const [nov, setNov] = useState (false)

    const [errors, setErrors] = useState({
        name: {
            error: false,
            message: "Deben ser al menos 3 caracteres."
        },
        lastName: { 
            error: false, 
            message: "Deben ser al menos 3 caracteres." 
        },
        email: { 
            error: false, 
            message: "Formato de correo electrónico inválido." }
    })

    function validarNombre(nombre){
        if(nombre.length>=3){
            return {name: {error: false, message: ""}}
        } else {
            return {name: {error: true, message: "Deben ser al menos 3 caracteres."}}
        }
    }

    function validarApellido(lastName){
        if(lastName.length>=3){
            return {lastName: {error: false, message: ""}}
        } else {
            return {lastName: {error: true, message: "Deben ser al menos 3 caracteres."}}
        }
    }

    function validarEmail(email){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(emailRegex.test(email)){
            return {email: {error: false, message: ""}}
        } else {
            return {email: {error: true, message: "Formato de correo electrónico inválido."}}
        }
    }

    return (
    <form onSubmit={(e) => {
        e.preventDefault() 
        handleSubmit({name,lastName, email, prom, nov})}}>
        <TextField 
        id="name" 
        label="Nombre" 
        variant="outlined" 
        fullWidth
        margin="normal"
        onChange={(e)=>{
            setName(e.target.value)
        }}
        value={name}
        error = {errors.name.error}
        helperText={errors.name.error ? errors.name.message : ""}
        onBlur={(e) => {
            setErrors(prevError => ({
                ...prevError,
                ...validarNombre(e.target.value)
            }))
        }}
        />
        <TextField 
        id="lastName" 
        label="Apellidos" 
        variant="outlined" 
        fullWidth
        margin="normal"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        error = {errors.lastName.error}
        helperText={errors.lastName.error ? errors.lastName.message : ""}
        onBlur={(e) => {
            setErrors(prevError => ({
                ...prevError,
                ...validarApellido(e.target.value)
            }))
        }}
        />
        <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => {
            const emailValue = e.target.value;
            setEmail(emailValue);
            const emailErrors = validarEmail(emailValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                ...emailErrors
            }));
        }}
        error = {errors.email.error}
        helperText={errors.email.message}
        />
        <FormGroup>
            <FormControlLabel control={<Switch 
            checked={prom} onChange={(e) => setProm(e.target.checked)}
            />} label="Promociones"/>
            <label>Novedades</label>
            <FormControlLabel control={<Switch 
            checked={nov} onChange={(e) => setNov(e.target.checked)}
            />}
            label="Novedades"/>
        </FormGroup>
        <Button variant="contained" type="submit">Registrarse</Button>
    </form>
    );
}

function CrearHook(){
    const [a, setA] = useState("a")
    return <></>
}

export default FormSignUp;
