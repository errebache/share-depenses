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

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};


function AddExpense() {
  const { idList } = useParams();
  const { usersList } = useContext(DataContext);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(null);
  const [imageUrl, setImageUrl] = useState({});
  const [currency, setCurrency] = useState("eur");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [participants, setParticipants] = useState([]);
  const [formParticipants, setFormParticipants] = useState(participants);
  const [totalAmount, setTotalAmount] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(null);

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleTotalAmountChange(e);
  };

  
  const handleTotalAmountChange = (e) => {
    setInputValue(e.target.value);
    const newTotalAmount = parseFloat(inputValue) || ""; // Convert to number or keep as an empty string if invalid
    console.log(newTotalAmount);

    if (!isNaN(newTotalAmount) && newTotalAmount !== "" && participants.length > 0) {
      console.log("New total amount:", newTotalAmount);
      setAmount(newTotalAmount);
  
      // Convert to cents to avoid floating-point issues
      const totalCents = Math.round(newTotalAmount * 100);
      const baseAmountPerParticipant = Math.floor(totalCents / participants.length);
      const remainder = totalCents % participants.length;
  
      const updatedParticipants = participants.map((participant, index) => {
        // Distribute the remainder one cent at a time to some participants
        const extraCent = index < remainder ? 1 : 0;
        const amountInCents = baseAmountPerParticipant + extraCent;
  
        return {
          ...participant,
          amount: (amountInCents / 100).toFixed(2), // Convert back to dollars/euros
        };
      });
  
      setParticipants(updatedParticipants);
      console.log("Updated participants:", updatedParticipants);
    } else if (participants.length === 0) {
      // No participants, so clear amounts
      setParticipants(participants.map(participant => ({
        ...participant,
        amount: '',
      })));
    } else {
      console.log("Invalid input for total amount:", inputValue);
    }
  };

  
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleTotalAmountChange();
  }
};

const handleDebouncedChange = (index, e) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  setTypingTimeout(
    setTimeout(() => {
      handleParticipantAmountChange(index, e);
    }, 300) // 300ms debounce delay
  );
};

const handleParticipantAmountChange = (index, e) => {
  const value = parseFloat(e.target.value) || 0;

  const updatedParticipants = [...formParticipants];
  updatedParticipants[index].amount = value;

  // Calculate the total amount after this input
  const totalAmount = updatedParticipants.reduce((sum, participant) => sum + participant.amount, 0);

  // Distribute the remaining amount across other participants
  if (totalAmount !== 0) {
    const remainingAmount = totalAmount - value;
    const otherParticipantsCount = formParticipants.length - 1;
    const amountPerOtherParticipant = remainingAmount > 0 && otherParticipantsCount > 0 
      ? Math.round((remainingAmount / otherParticipantsCount) * 100) / 100 
      : 0;

    for (let i = 0; i < updatedParticipants.length; i++) {
      if (i !== index) {
        updatedParticipants[i].amount = amountPerOtherParticipant;
      }
    }
  }

  setFormParticipants(updatedParticipants);
  setTotalAmount(totalAmount);
};



  const submit = async (data) => {
    const splitAmong = participants.map(participant => ({
      userId: participant.userId,
      amount: participant.amount,
    }));

    console.log(splitAmong);

    const newItem = { 
      ...data, 
      paidBy: "669d63b92d2322d0e96224ab",
      list: idList,
      category: "Food",
    };

    try {
      const response = await addExpense(newItem,imageUrl,splitAmong);
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
                                onChange={handleTotalAmountChange}
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
                            <div key={participant.id || index} className="col-md-5">
                              <div className="form-group">
                                <label>{participant.label}</label>
                                <input
                                  type="number"
                                  className="form-control mb-3"
                                  value={participant.amount}
                                  onChange={(e) => handleDebouncedChange(index, e)}
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
