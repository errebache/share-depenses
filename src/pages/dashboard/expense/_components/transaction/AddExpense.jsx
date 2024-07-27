import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageInput from "../../../../../components/common/_components/ImageInput";
import StickySection from "../../../../../components/common/_components/StickySection";
import { addExpense } from "../../../../../services/apis/expense";
import { useParams } from "react-router-dom";
import Select from "../../../../../components/common/_components/select";
import {
  categories,
  currencyOptions,
  users,
} from "../../../../../components/common/_components/data";
import SelectComponent from "../../../../../components/common/_components/select";
import { DataContext } from "../../../../../context/DataContext";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { API_USERS } from "../../../../../services/apis/apis";

function AddExpense() {
  const { idList } = useParams();
  const { usersList } = useContext(DataContext);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState(0);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_USERS}/usersList/${idList}`);
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setErrorFetch(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [idList]);

  useEffect(() => {
    console.log("Checking members:", members);
    if (Array.isArray(members) && members.length > 0) {
      members.forEach(member => {
        console.log(member);
      });
      const updatedParticipants = members.map(member => ({
        userId: member._id,
        label: member.name,
        value: member.name,
        image: '',
        amount: 0,
      }));
      setParticipants(updatedParticipants);
      console.log("Participants updated:", updatedParticipants);
    } else {
      console.log("Members is not a valid array or it is empty.");
    }
  }, [members]);
  

  const schema = yup.object().shape({
    description: yup
      .string()
      .required("Description is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive"),
  });

  const defaultValue = {
    description: "",
    amount: 0,
    list: "",
    currency: "eur",
    splitAmong: [],
    image: "",
    categorie: "",
    createdAt: "",
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
    setError,
    clearErrors,
    setFocus,
  } = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleImageChange = (selectedImage) => {
    setImageUrl(selectedImage);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleTotalAmountChange = (e) => {
    const value = e.target.value;
    const newTotalAmount = parseFloat(value) || "";    
    if (!isNaN(newTotalAmount)) {
      console.log("New total amount:", newTotalAmount);
      setAmount(newTotalAmount);

      if (participants.length > 0) {
        const amountPerParticipant = parseFloat(newTotalAmount / participants.length).toFixed(3) * 10;
        console.log("Amount per participant:", amountPerParticipant);

        const updatedParticipants = participants.map(participant => ({
          ...participant,
          amount: parseFloat(amountPerParticipant),
        }));

        setParticipants(updatedParticipants);
        console.log("Updated participants:", updatedParticipants);
      } else {
        const updatedParticipants = participants.map(participant => ({
          ...participant,
          amount: '',
        }));
        setParticipants(updatedParticipants);
      }
    } else {
      console.log("Invalid input for total amount:", e.target.value);
    }
  };
  
  const handleParticipantAmountChange = (index, e) => {
    const value = e.target.value;
    const newAmount = parseFloat(value) || '';

    const updatedParticipants = [...participants];
    updatedParticipants[index].amount = newAmount;

    // Calculate the total amount set in the inputs
    const totalAmount = updatedParticipants.reduce((sum, participant) => sum + participant.amount, 0);

    // Recalculate the amount for other participants if totalAmount is not zero
    if (totalAmount !== 0) {
      const otherParticipantsCount = participants.length - 1;
      const remainingAmount = totalAmount - newAmount;
      const amountPerOtherParticipant = remainingAmount > 0 && otherParticipantsCount > 0 ? Math.round((remainingAmount / otherParticipantsCount) * 100) / 100 : 0;

      for (let i = 0; i < updatedParticipants.length; i++) {
        if (i !== index) {
          updatedParticipants[i].amount = amountPerOtherParticipant;
        }
      }
    }

    setParticipants(updatedParticipants);
    setAmount(totalAmount);
  };



  const submit = async (data) => {
    const splitAmong = participants.map(participant => ({
      userId: participant.userId,
      amount: participant.amount,
    }));

    const newItem = { 
      ...data, 
      paidBy: "669d63b92d2322d0e96224ab",
      list: idList,
      category: "Food",
      image: imageUrl,
      splitAmong
    };

    try {
      const response = await addExpense(idList, newItem);
      console.log("Expense added successfully:", response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8 col-md-12 col-12 mx-auto">
        <div className="content-page">
          <form
            className="section general-info"
            onSubmit={handleSubmit(submit)}
          >
            <div className="info">
              <div className="row">
                <div className="col-lg-11 mx-auto">
                  <h4 className="text-center mt-10 mb-10">
                    Ajouter une dépense
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-11 mx-auto">
                  <div className="row">
                    <div className="form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                              Description
                            </h5>
                            <input
                              type="text"
                              className="form-control mb-3"
                              placeholder="dépense"
                              {...register("description")}
                            />
                            {errors.description && (
                              <p style={{ color: "red" }}>
                                {errors.description.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h5 className="flex-fill title-bold mt-10 mb-10 title-bold"></h5>
                          <div className="form-group">
                            <SelectComponent
                              onChange={handleCurrencyChange}
                              {...register("categorie")}
                              options={categories}
                              type="image"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                            Choose payer
                          </h5>
                          <div className="form-group">
                            <SelectComponent
                              onChange={handleCurrencyChange}
                              {...register("paidBy")}
                              options={participants}
                              type="image"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold">
                              Amount
                            </h5>
                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Amount"
                                autocomplete="off"
                                onKeyDown={handleTotalAmountChange}
                                {...register("amount")}
                              />
                            {errors.amount && (
                              <p style={{ color: "red" }}>
                                {errors.amount.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold"></h5>
                            <select
                              className="form-select form-control mb-3"
                              onChange={handleCurrencyChange}
                              {...register("currency")}
                            >
                              <option value="eur">EUR (€)</option>
                              <option value="usd">USD ($)</option>
                              <option value="mad">MAD</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <h5 className="flex-fill text-bold mt-10 mb-10 title-bold"></h5>{" "}
                            <input
                              type="date"
                              id="dateInput"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-2 text-center">
                          <ImageInput
                            format={false}
                            size="sm"
                            className="mt-30 ml-5"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="flex-fill text-bold mt-20 mb-20 ">
                            Participants
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                      {participants.map((participant, index) => (
                        <div key={index} className="col-md-5">
                          <div className="form-group">
                            <label>{participant.label}</label>
                            <input
                              type="number"
                              className="form-control mb-3"
                              value={participant.amount}
                              onChange={(e) => handleParticipantAmountChange(index, e)}
                            />
                          </div>
                        </div>
                      ))}
                      </div>
                      <StickySection offset={5}>
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <button
                              disabled={isSubmitting}
                              className="btn btn-primary my-2 mx-3"
                            >
                              Sauvegarder
                            </button>
                            <button
                              disabled={isSubmitting}
                              className="btn btn-border my-2"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      </StickySection>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
