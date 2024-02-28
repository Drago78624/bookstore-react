import React from 'react'
import Cards from 'react-credit-cards-2';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const formSchema = yup.object().shape({
    number: yup.string().required("Please enter the credit card number"),
    expiry: yup.string().required("Please enter the expiry date"),
    cvc: yup.string().required("Please enter the cvc"),
    name: yup.string().required("Please enter the name"),
  });

const PaymentMethodForm = () => {
  return (
    <div>
        <Cards
            number=""
            expiry=""
            cvc=""
            name=""
            focused=""
        />
    </div>
  )
}

export default PaymentMethodForm