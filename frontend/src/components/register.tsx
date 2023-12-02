import { Button, Modal, Label, TextInput } from "flowbite-react";
import { type SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";

function Register() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    await router.push("/login");
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="success">
        Toggle modal
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Please Register</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex max-w-md flex-col gap-4" onSubmit={submit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  id="name"
                  type="string"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" color="blue">
                Submit
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
