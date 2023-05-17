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
          label="User Create"
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <motion.div
          initial={{ y: "30px", opacity: 0 }}
          animate={{ y: "0px", opacity: 1 }}
        >
          <FormWarper route="/api/ticket">
            <Input
              label="Subject"
              errorMessage="*require"
              placeholder="Name..."
            />
            <div className="form-dropdown-label">
              <label htmlFor="">Role</label>
              <span>*require</span>
            </div>
            <Dropdown
              placement="bottom"
              buttonClassName="form-dropdown-btn"
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
            <div className="form-dropdown-label">
              <label htmlFor="">Role</label>
              <span>*require</span>
            </div>
            <Dropdown
              placement="bottom"
              buttonClassName="form-dropdown-btn"
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
          </FormWarper>
        </motion.div>
      </div>
    </>
  );
};

export default TicketCreate;
