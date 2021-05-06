import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./PersonalPage.css"

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  developer?: string;
};

const PersonalPage = () => {
    const [changeForm, setChangeForm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<FormValues>();
      const onSubmit = (data: FormValues) => {
        console.log(data);
      };
    const changeEvent=()=>{
        changeForm? setChangeForm(false) : setChangeForm(true);
    }
      return (
          <div>
              <button className="common-button" onClick={changeEvent}>change</button>
        <form className={changeForm? 'notDisabledForm' : 'disabledForm'} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name:</label>
          <input  
            {...register("firstName", { required: "This is required." })}
            id="firstName"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
    
          <label htmlFor="lastName">Last Name:</label>
          <input {...register("lastName", { required: true, minLength: 5 })} />
    
          <label htmlFor="age">Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            id="age"
          />
    
          <label htmlFor="gender"></label>
          <select {...register("gender")} id="gender">
            <option value="">Select...</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <label htmlFor="phone">Your phone:</label>
          <input {...register("phone", { required: true, minLength: 5 })} />

          <label htmlFor="email">Your email:</label>
          <input {...register("email", { required: true, minLength: 5 })} />
          
          {//<label htmlFor="developer">Are you a developer?</label><input {...register("developer")} value="yes" type="checkbox" />
          }
          <button className="common-button" onClick={changeEvent}>сохранить</button>
         {//<input type="submit" />
         }
        </form>
        </div>
      );
  }
  
  export default PersonalPage;