import { Field, Formik, Form } from "formik";

function SearchBar({ onSearch }) {
  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form>
          <Field name="query" />
          <button type="submit">Search!</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
