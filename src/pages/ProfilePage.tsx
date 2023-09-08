import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { setUser } from "../redux/reducer";
import { fetchData } from "../service/service";
import { FieldValues, useForm } from "react-hook-form";
import AlertBox from "../components/AlertBox";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.item.user);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

  const [alert, setAlert] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleExitAlert = () => {
    setAlert((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
  };
  useEffect(() => {
    const fetchDataAndUpdateProfile = async () => {
      try {
        const res = await fetchData(
          "https://take-home-test-api.nutech-integrasi.app/profile"
        );
        const data = await res.json();
        setProfile((prevProfile: any) => ({
          ...prevProfile,
          ...data?.data,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchDataAndUpdateProfile();
    } else {
      setValue("first_name", user?.first_name);
      setValue("last_name", user?.last_name);
    }
  }, [setValue, user]);

  const handleSubmitForm = async (data: FieldValues) => {
    const params = {
      ...data,
    };
    try {
      const res = await fetchData(
        "https://take-home-test-api.nutech-integrasi.app/profile/update",
        {
          method: "put",
          body: JSON.stringify(params),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAlert((prev) => {
          return {
            ...prev,
            show: true,
            message: data?.message,
            success: true,
          };
        });
        dispatch(setUser(data?.data));
        setIsEdit(false);
        return;
      }
      setAlert((prev) => {
        return {
          ...prev,
          show: true,
          message: data?.message,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlert((prev) => {
          return {
            ...prev,
            show: false,
            success: false,
          };
        });
      }, 1500);
    }
  };

  

  const handleChangeFile = async (e: any) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
       await fetchData(
        "https://take-home-test-api.nutech-integrasi.app/profile/image",
        {
          method: "put",
          body: formData,
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (profile) {
      dispatch(setUser(profile));
    }
  }, [dispatch, profile]);

  return (
    <>
      <div className="text-center">
        <div
          className="position-relative mx-auto mb-3"
          style={{
            width: "fit-content",
          }}
        >
          <img
            alt=""
            width={128}
            src={process.env.PUBLIC_URL + "/assets/Profile Photo.png"}
          />
          <input type="file" hidden name="file" id="file" onChange={handleChangeFile} />
          <label htmlFor="file" className="profile-edit cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </label>
        </div>
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
      </div>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled={true}
            type="text"
            placeholder="Email"
            defaultValue={user?.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            {...register("first_name")}
            disabled={!isEdit}
            type="text"
            placeholder="First name"
            defaultValue={user?.first_name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            {...register("last_name")}
            disabled={!isEdit}
            type="text"
            placeholder="Last Name"
            defaultValue={user?.last_name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        {!isEdit ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
            type={"button"}
            className="w-100 mb-4"
          >
            Edit Profile
          </Button>
        ) : (
          <Button type="submit" className="w-100 mb-4">
            Simpan
          </Button>
        )}
      </Form>
      {!isEdit && (
        <Button variant="outline-primary" className="w-100">
          Log Out
        </Button>
      )}
      <AlertBox alert={alert} handleExitAlert={handleExitAlert} />
    </>
  );
}
