import ApiService from '../../services/ApiService';

const proposeData = {
  proposal: 1,
  amount: 100,
  barrier: "+0.1",
  basis: "payout",
  contract_type: "CALL",
  currency: "USD",
  duration: 60,
  duration_unit: "s",
  symbol: "R_100",
};

class Proposal extends React.Component {
  state = {
    proposalSubmitted: false,
    error: null,
  };

  handleProposalSubmit = async () => {
    try {
      await ApiService.postProposal(proposeData);
      this.setState({ proposalSubmitted: true });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { proposalSubmitted, error } = this.state;

    if (proposalSubmitted) {
      return (
        <div>
          <h2>Proposal Sent!</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h2>Error!</h2>
          <p>{error.message}</p>
        </div>
      );
    }

    return (
      <button onClick={this.handleProposalSubmit}>Submit Proposal</button>
    );
  }
}

export default Proposal;



