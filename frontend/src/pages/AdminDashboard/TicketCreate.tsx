import Nav from "../../components/Nav";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import { motion } from "framer-motion";
import { userRoles } from "../../redux/variable/UserPageVariable";
import Dropdown from "../../components/DropDown";

const TicketCreate = () => {
  const dispatch = useAppDispatch();
  function onSubmitHandler() {}
  return (
    <>
      <div className="admin-container admin-container--textarea">
        <Nav.BackButton
          label="Ticket Create"
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <FormWarper route="/api/ticket">
          <motion.div
            initial={{ y: "30px", opacity: 0 }}
            animate={{ y: "0px", opacity: 1 }}
          >
            <div className="row row--gap-1">
              <div className="col-12">
                <Input
                  label="Subject"
                  errorMessage="*require"
                  placeholder="Name..."
                />
              </div>
              <div className="col-6">
                <div className="form-dropdown-label">
                  <label htmlFor="">Project</label>
                  <span>*require</span>
                </div>
                <Dropdown
                  placement="bottom"
                  buttonClassName="form-dropdown-btn"
                  offset={[65, 0]}
                  buttonChildren={
                    <>
                      {/* {dropdownBox.name}
                <IconMenuOrder size={20} /> */}
                    </>
                  }
                  dropdownClassName="form-dropdown"
                  dropdownChildren={
                    <>
                      {Object.keys(userRoles).map((role: string) => {
                        return (
                          <Button
                            type="button"
                            onClick={() => {}}
                            label={role}
                          />
                        );
                      })}
                    </>
                  }
                />
              </div>
              <div className="col-6">
                <div className="form-dropdown-label">
                  <label htmlFor="">Priority</label>
                  <span>*require</span>
                </div>
                <Dropdown
                  placement="bottom"
                  buttonClassName="form-dropdown-btn"
                  offset={[65, 0]}
                  buttonChildren={
                    <>
                      {/* {dropdownBox.name}
                <IconMenuOrder size={20} /> */}
                    </>
                  }
                  dropdownClassName="form-dropdown"
                  dropdownChildren={
                    <>
                      {Object.keys(userRoles).map((role: string) => {
                        return (
                          <Button
                            type="button"
                            onClick={() => {}}
                            label={role}
                          />
                        );
                      })}
                    </>
                  }
                />
              </div>
              <div className="col-12">
                <Input
                  label="Google Drive Link"
                  errorMessage="*optional"
                  placeholder="https://drive.google.com/file/.."
                />
              </div>
            </div>

            <Input.Textarea
              label="Description"
              errorMessage="*require"
              placeholder="Name..."
            />
            <Button
              type="button"
              label="Create Ticket"
              className="btn btn--form"
              onClick={onSubmitHandler}
            />
          </motion.div>
        </FormWarper>
      </div>
    </>
  );
};

export default TicketCreate;
