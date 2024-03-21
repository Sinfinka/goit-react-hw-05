import { Field, Formik, Form } from "formik";
import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.field}
            name="query"
            placeholder="Search for a movie."
          />
          <button type="submit">Search!</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
