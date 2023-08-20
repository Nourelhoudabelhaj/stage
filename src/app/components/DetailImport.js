
function DetailImport({ values }) {
    return (
        <div>
            <h2>{values.title}</h2>
            <p>تاريخ الرسالة: {values.start}</p>
            <p>نوع: {values.type}</p>
            <p>مكتمل: {values.completed ? 'نعم' : 'لا'}</p>
            <p>تاريخ الوصول: {values.end}</p>
            <p>رقمها: {values.Number}</p>
            <p>الموضع: {values.textareaValue}</p>
            <p>ID: {values.id}</p>
        </div>
    );
}

export default DetailImport;
