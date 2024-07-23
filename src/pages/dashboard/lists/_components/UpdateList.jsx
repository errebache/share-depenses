import { useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageInput from "../../../../components/common/_components/ImageInput";

function UpdateList() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [currency, setCurrency] = useState("eur");

  const formSchema = {
    name: yup.string()
    .required("Name of member is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Too short")
      .max(50, "Too long"),
    currency: yup.string().required("Currency is required"),
    groups: yup
    .array()
    .of(yup.object().shape(formSchema))
    .required("Must have fields")
    .min(1, "Minimum of 1 field")
  });

  const defaultValue = {
    name: "",
    currency: "eur",
    groups: [],
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
    mode: "onChange"
  });

  const { fields, append, remove } = useFieldArray({
    name: "groups",
    control,
  });

  function addUser() {
    append({
      name: "",
      email: "",
    });
  }

  function deleteUser(index) {
    remove(index);
  }

  const handleImageChange = (selectedImage) => {
    setImageUrl(selectedImage);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const submit = (values) => {
    const newItem = { ...values, image: imageUrl };
    console.log(newItem);
    setFormData(newItem);
    console.log(formData);
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
              <h4 className="mb-15">Modifier la liste</h4>
              <div className="row">
                <div className="col-lg-11 mx-auto">
                  <div className="row">
                    <div className="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                      <div className="form">
                        <div className="row">
                          <div className="col-md-12 text-center my-5">
                            <ImageInput onChange={handleImageChange} format={true} size="md"/>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Nom de la liste"
                                {...register("name")}
                              />
                              {errors.name && (
                                <p style={{ color: "red" }}>
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <select
                                className="form-select form-control mb-3"
                                onChange={handleCurrencyChange}
                                {...register("currency")}
                              >
                                <option value="eur">EUR (€)</option>
                                <option value="usd">USD ($)</option>
                                <option value="mad">MAD</option>
                              </select>
                              {errors.currency && (
                                <p style={{ color: "red" }}>
                                  {errors.currency.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                          {!errors.name?.types?.required && (
                              <>
                                <label className="mb-5 d-flex flex-row justify-content-center align-items-center">
                                  <span className="flex-fill">
                                    MEMBRES DU GROUPE
                                  </span>
                                </label>
                                <ul className="mb-3">
                                  {fields.map((user, i) => (
                                    <li
                                      key={user.id}
                                    >
                                    <div className="d-flex flex-row my-2">  
                                    <input
                                        {...register(`groups[${i}].name`)}
                                        className="flex-fill mr-5"
                                        placeholder="Name"
                                        type="text"
                                      />
                                      <input
                                        {...register(`groups[${i}].email`)}
                                        className="flex-fill mr-5"
                                        placeholder="Email address (optionel)"
                                        type="text"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => deleteUser(i)}
                                        className="btn btn-priamry"
                                      >
                                        <i
                                          style={{ color: "red" }}
                                          className="bi bi-x-circle"
                                        ></i>
                                      </button>
                                    </div>
                                      {errors.groups?.length &&
                                        errors.groups[i]?.name && (
                                          <p className="d-block" style={{ color: "red" }}>
                                            {errors.groups[i].name.message}
                                          </p>
                                        )}
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={addUser}
                                  type="button"
                                  className="btn btn-link"
                                >
                                  <i className="bi bi-plus-circle mx-2"></i>
                                  Ajouter une personne
                                </button>
                              </>
                            )}
                          </div>
                          <div className="col-md-12 text-center">
                            <div className="form-group">
                              <button
                                disabled={isSubmitting}
                                className="btn btn-primary my-2"
                              >
                                Sauvegarder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default UpdateList;
