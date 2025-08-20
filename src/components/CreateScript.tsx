export function CreateScript({ apiKey, userId }: { apiKey: string; userId?: string }) {
    console.log(apiKey, userId);
  return (
    <div>
      {/* Custom styles for this component */}
      <style>{`
        body {
          background-color: #f8f9fa;
        }
        .guided-mode {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .guided-header {
          background: #e6ddf5;
          padding: 12px;
          font-weight: bold;
          color: #5a3f9e;
          border-radius: 8px 8px 0 0;
        }
        .step-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0;
        }
        .step {
          text-align: center;
          flex: 1;
          position: relative;
        }
        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          font-weight: bold;
        }
        .step.active .step-circle {
          background: #6f42c1;
          color: #fff;
          border-color: #6f42c1;
        }
        .step-title {
          font-size: 0.9rem;
        }
        .step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 18px;
          right: -50%;
          width: 100%;
          height: 2px;
          background: #ccc;
          z-index: -1;
        }
        .step.active ~ .step::after {
          background: #ccc;
        }
        .section-header {
          background: #e6f0fb;
          padding: 8px 12px;
          font-weight: 500;
          color: #2b4a6f;
          border-radius: 6px;
          margin-top: 20px;
        }
        .custom-table th, .custom-table td {
          vertical-align: middle;
        }
        .footer-buttons {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
      `}</style>

        <div className="guided-mode">
          {/* Header */}
          <div className="guided-header">Guided Mode</div>

          {/* Steps */}
          <div className="step-indicator">
            <div className="step active">
              <div className="step-circle">1</div>
              <div className="step-title">Create Script</div>
            </div>
            <div className="step">
              <div className="step-circle">2</div>
              <div className="step-title">Character Setup</div>
            </div>
            <div className="step">
              <div className="step-circle">3</div>
              <div className="step-title">Video Setup</div>
            </div>
            <div className="step">
              <div className="step-circle">4</div>
              <div className="step-title">AI Setup</div>
            </div>
            <div className="step">
              <div className="step-circle">5</div>
              <div className="step-title">Ready To Render</div>
            </div>
          </div>

          {/* Characters */}
          <div className="section-header">Characters</div>
          <table className="table table-bordered custom-table mt-2">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Personality</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aiko</td>
                <td>energetic, curious</td>
              </tr>
              <tr>
                <td>Sensei Kaito</td>
                <td>patient, friendly</td>
              </tr>
              <tr>
                <td>bob</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* Slides */}
          <div className="section-header">Slides</div>
          <table className="table table-bordered custom-table mt-2">
            <thead className="table-light">
              <tr>
                <th>Slides</th>
                <th>Dialogue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sensei Kaito</td>
                <td>Hai, Aiko. Selamat datang. Hari ini kita akan belajar percakapan bahasa Jepang dasar.</td>
              </tr>
              <tr>
                <td>Aiko</td>
                <td>Hai, Sensei. Saya sangat tertarik belajar bahasa Jepang!</td>
              </tr>
            </tbody>
          </table>

          {/* Footer Buttons */}
          <div className="footer-buttons">
            <button className="btn btn-outline-secondary me-2">Reset</button>
            <button className="btn btn-primary">Next</button>
          </div>
        </div>
    </div>
  );
}

export default CreateScript;
