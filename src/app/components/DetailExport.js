

const DetailExport = ({ values }) => {
    return (
        <div>
            <h2>{values.date}</h2>
            <p>المرسل اليه : {values.receiver}</p>
            <p>الموضع: {values.object}</p>
            <p>نوع: {values.type}</p>
            <p>اعادتها: {values.reply.length === 0 ? 'No replies' : values.reply.join(', ')}</p>
            <h3>ملاحظات:</h3>
            {values.notes.map((note) => (
                <div key={note.number}>
                    <p>ملاحظات: {note.number}</p>
                    <p>تاريخ of ملاحظات: {note.dateOfNote}</p>
                </div>
            ))}
        </div>
    );
}
export default DetailExport